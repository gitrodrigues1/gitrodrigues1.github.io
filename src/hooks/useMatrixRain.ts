"use client";

import { useEffect } from "react";
import type { Theme } from "@/i18n/theme";

interface RainTheme {
  /** Bright leading glyph of each stream. */
  head: string;
  /** Glyphs left behind in the column. */
  trail: string;
  /** Overall glyph opacity, so the rain stays a subtle backdrop. */
  alpha: number;
}

const RAIN_THEMES: Record<Theme, RainTheme> = {
  dark: { head: "#eafff0", trail: "#22c55e", alpha: 0.65 },
  light: { head: "#064e3b", trail: "#059669", alpha: 0.22 },
};

interface RainLayer {
  /** Cylinder radius relative to the nearest curtain. */
  radius: number;
  alpha: number;
  /** Fall-speed multiplier. */
  speed: number;
}

const LAYERS: RainLayer[] = [
  { radius: 2.4, alpha: 0.4, speed: 0.5 },
  { radius: 1.6, alpha: 0.65, speed: 0.75 },
  { radius: 1, alpha: 1, speed: 1 },
];

const CAMERA_OFFSET = 0.7;
const EDGE_SCALE = 0.65;
const TRAIL_LENGTH = 14;
const YAW_SWING = (30 * Math.PI) / 180;
const MOUSE_YAW = (6 * Math.PI) / 180;
const MOUSE_PITCH = (3 * Math.PI) / 180;
const NEAR_CLIP = 0.02;
const VIEW_MARGIN = 0.6;

const FONT_FAMILY =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

const GLYPHS =
  "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾚﾛﾜﾝ0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function randomGlyph(): string {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0];
}

function horizontalFov(offset: number, edgeScale: number): number {
  const t = (1 - offset) / edgeScale;
  const cos = (1 - offset * offset - t * t) / (2 * offset * t);
  return 2 * Math.acos(Math.min(1, Math.max(-1, cos)));
}

interface Column {
  theta: number;
  x: number;
  z: number;
  headY: number;
  speed: number;
  cell: number;
  trail: string[];
}

interface Curtain {
  layer: RainLayer;
  span: number;
  columns: Column[];
}

function createColumn(
  theta: number,
  radius: number,
  layerSpeed: number,
  span: number,
  worldCell: number
): Column {
  const headY = (Math.random() * 2 - 1) * span;
  return {
    theta,
    x: Math.sin(theta) * radius,
    z: -Math.cos(theta) * radius,
    headY,
    speed: (2 + Math.random() * 5) * worldCell * layerSpeed,
    cell: Math.floor(headY / worldCell),
    trail: Array.from({ length: TRAIL_LENGTH }, randomGlyph),
  };
}

function respawnColumn(
  column: Column,
  span: number,
  layerSpeed: number,
  worldCell: number
): void {
  column.headY = span + Math.random() * worldCell * 6;
  column.speed = (2 + Math.random() * 5) * worldCell * layerSpeed;
  column.cell = Math.floor(column.headY / worldCell);
  for (let i = 0; i < TRAIL_LENGTH; i++) {
    column.trail[i] = randomGlyph();
  }
}

interface ViewPoint {
  x: number;
  y: number;
  z: number;
}

function projectPoint(
  x: number,
  y: number,
  z: number,
  camZ: number,
  yaw: number,
  pitch: number
): ViewPoint {
  const dx = x;
  const dy = y;
  const dz = z - camZ;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = dx * cy + dz * sy;
  const z1 = -dx * sy + dz * cy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return {
    x: x1,
    y: dy * cp + z1 * sp,
    z: -dy * sp + z1 * cp,
  };
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Draws the Matrix-style rain on a full-screen canvas.
 * The animation reacts to scroll (camera yaw), pointer position, and the
 * current theme. It is skipped when the user prefers reduced motion.
 */
export function useMatrixRain(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  theme: Theme
): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Local aliases with narrowed types for the inner closures.
    const canvasEl = canvas;
    const ctx2d = ctx;

    const rainTheme = RAIN_THEMES[theme];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const baseCell = isMobile ? 20 : 16;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const hfov = horizontalFov(CAMERA_OFFSET, EDGE_SCALE);
    const camZ = -CAMERA_OFFSET;

    let width = 0;
    let height = 0;
    let focal = 1;
    let worldCell = 1;
    let vHalf = 1;
    let curtains: Curtain[] = [];

    function buildCurtains(): void {
      const step = worldCell;
      const count = Math.ceil((Math.PI * 2) / step);
      curtains = LAYERS.map((layer) => {
        const span =
          ((layer.radius - CAMERA_OFFSET) / EDGE_SCALE) * vHalf +
          TRAIL_LENGTH * worldCell;
        const columns: Column[] = new Array(count);
        for (let i = 0; i < count; i++) {
          const theta = -Math.PI + (i + 0.5) * ((Math.PI * 2) / count);
          columns[i] = createColumn(theta, layer.radius, layer.speed, span, worldCell);
        }
        return { layer, span, columns };
      });
    }

    function resize(): void {
      width = window.innerWidth;
      height = window.innerHeight;
      if (width < 2 || height < 2) return;

      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx2d.textAlign = "center";
      ctx2d.textBaseline = "middle";

      focal = width / 2 / Math.tan(hfov / 2);
      vHalf = Math.tan(hfov / 2) * (height / width);
      worldCell = (baseCell * (1 - CAMERA_OFFSET)) / focal;

      buildCurtains();
    }

    function paintGlyph(
      column: Column,
      ch: string,
      y: number,
      alpha: number,
      color: string,
      yaw: number,
      pitch: number
    ): void {
      const v = projectPoint(column.x, y, column.z, camZ, yaw, pitch);
      if (v.z >= -NEAR_CLIP) return;
      const depth = -v.z;
      const size = (worldCell / depth) * focal;
      const sx = width / 2 + (v.x / depth) * focal;
      const sy = height / 2 - (v.y / depth) * focal;
      if (sx < -size || sx > width + size || sy < -size || sy > height + size) {
        return;
      }
      ctx2d.globalAlpha = alpha;
      ctx2d.fillStyle = color;
      ctx2d.font = `${Math.round(size * 2) / 2}px ${FONT_FAMILY}`;
      ctx2d.fillText(ch, sx, sy);
    }

    function render(yaw: number, pitch: number, flicker: boolean): void {
      ctx2d.globalCompositeOperation = "source-over";
      ctx2d.globalAlpha = 1;
      ctx2d.clearRect(0, 0, width, height);

      for (const curtain of curtains) {
        const { layer, columns } = curtain;
        const frontDist = layer.radius - CAMERA_OFFSET;
        for (const column of columns) {
          let dTheta = column.theta - yaw;
          dTheta = Math.atan2(Math.sin(dTheta), Math.cos(dTheta));
          if (Math.abs(dTheta) > VIEW_MARGIN) continue;

          const origin = projectPoint(column.x, 0, column.z, camZ, yaw, pitch);
          if (origin.z >= -NEAR_CLIP) continue;
          const dist = Math.hypot(origin.x, origin.z);
          const size = (worldCell / dist) * focal;
          if (size < 1.25) continue;
          const shade = Math.min(1, frontDist / dist);

          const boundary = (column.cell + 1) * worldCell;

          for (let i = TRAIL_LENGTH - 1; i >= 0; i--) {
            const fade = 1 - (i + 1) / (TRAIL_LENGTH + 1);
            paintGlyph(
              column,
              column.trail[i],
              boundary + i * worldCell,
              rainTheme.alpha * layer.alpha * shade * fade,
              rainTheme.trail,
              yaw,
              pitch
            );
          }
          paintGlyph(
            column,
            flicker ? randomGlyph() : column.trail[0],
            column.headY,
            rainTheme.alpha * layer.alpha * shade,
            rainTheme.head,
            yaw,
            pitch
          );
        }
      }
      ctx2d.globalAlpha = 1;
    }

    function update(dt: number): void {
      for (const curtain of curtains) {
        for (const column of curtain.columns) {
          column.headY -= column.speed * dt;
          let guard = 0;
          while (column.cell > Math.floor(column.headY / worldCell) && guard++ < 8) {
            column.cell -= 1;
            column.trail.pop();
            column.trail.unshift(randomGlyph());
          }
          if (column.headY < -curtain.span) {
            respawnColumn(column, curtain.span, curtain.layer.speed, worldCell);
          }
        }
      }
    }

    function scrollYaw(): number {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0
        ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
        : 0;
      const eased = smoothstep(progress);
      return -YAW_SWING + eased * (YAW_SWING * 2);
    }

    const mouse = { x: 0, y: 0 };
    const look = { yaw: 0, pitch: 0 };

    function onMouseMove(event: MouseEvent): void {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    let lastTime = performance.now();
    let rafId = 0;

    function tick(now: number): void {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      update(dt);

      const smoothing = 1 - Math.pow(0.965, dt * 60);
      look.yaw += (mouse.x * MOUSE_YAW - look.yaw) * smoothing;
      look.pitch += (-mouse.y * MOUSE_PITCH - look.pitch) * smoothing;

      render(scrollYaw() + look.yaw, look.pitch, true);
      rafId = requestAnimationFrame(tick);
    }

    function start(): void {
      cancelAnimationFrame(rafId);
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    }

    function stop(): void {
      cancelAnimationFrame(rafId);
    }

    function onResize(): void {
      resize();
      if (reducedMotion) render(scrollYaw(), 0, false);
    }

    function onVisibilityChange(): void {
      document.hidden ? stop() : start();
    }

    resize();
    if (width < 2) return;
    if (reducedMotion) {
      render(scrollYaw(), 0, false);
      return;
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [canvasRef, theme]);
}
