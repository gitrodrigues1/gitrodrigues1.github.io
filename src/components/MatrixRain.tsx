"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/i18n/theme";

interface RainTheme {
  /** Bright leading glyph of each stream. */
  head: string;
  /** Glyphs left behind in the column. */
  trail: string;
  /** Overall glyph opacity, so the rain stays a subtle backdrop. */
  alpha: number;
}

const RAIN_THEMES: Record<"dark" | "light", RainTheme> = {
  dark: { head: "#eafff0", trail: "#22c55e", alpha: 0.65 },
  light: { head: "#064e3b", trail: "#059669", alpha: 0.22 },
};

/**
 * Concentric curtains, drawn far → near. The camera sits inside, offset
 * toward the nearest wall; glyph size comes from distance, so these radii
 * are what make the far rain smaller and slower in screen space.
 */
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

/** Fraction of the near radius from the axis toward the front wall. */
const CAMERA_OFFSET = 0.7;
/** Screen-edge glyph size ÷ center glyph size, on the nearest curtain. */
const EDGE_SCALE = 0.65;
const TRAIL = 14;
const YAW_SWING = (30 * Math.PI) / 180;
const MOUSE_YAW = (6 * Math.PI) / 180;
const MOUSE_PITCH = (3 * Math.PI) / 180;
const NEAR_CLIP = 0.02;
/** Cylinder angle past the look direction still worth projecting (~24° fills the screen). */
const VIEW_MARGIN = 0.6;

const FONT_FAMILY =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

/** Half-width katakana + latin & digits, like the film's glyph rain. */
const GLYPHS =
  "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾚﾛﾜﾝ0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

const glyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

/**
 * Horizontal FOV that puts a nearest-curtain glyph at `edgeScale` of its
 * center size, for a camera `offset` of the way from the axis to the wall.
 * Size is angular (1 / distance), not 1/z — at this offset a wide FOV is the
 * only way the wall actually rounds.
 */
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
  /** World units per second. */
  speed: number;
  /** Cell the head is currently inside. */
  cell: number;
  /** Frozen glyphs above the head, nearest first. */
  trail: string[];
}

interface Curtain {
  layer: RainLayer;
  /** Half-height of the band columns fall through, in world units. */
  span: number;
  columns: Column[];
}

/**
 * Fixed full-screen Matrix rain on three cylinders, viewed from inside.
 * Scroll yaws the camera from -30° to +30° (smoothstep over the page);
 * the pointer adds a small look. Trails are stored per column and redrawn
 * every frame, so they stay glued to the rain as the camera turns.
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rt = RAIN_THEMES[theme];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const baseCell = isMobile ? 20 : 16;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const hfov = horizontalFov(CAMERA_OFFSET, EDGE_SCALE);
    const camZ = -CAMERA_OFFSET;

    let w = 0;
    let h = 0;
    let focal = 1;
    let worldCell = 1;
    let vHalf = 1;
    let curtains: Curtain[] = [];

    const makeColumn = (
      theta: number,
      radius: number,
      layerSpeed: number,
      span: number
    ): Column => {
      const headY = (Math.random() * 2 - 1) * span;
      return {
        theta,
        x: Math.sin(theta) * radius,
        z: -Math.cos(theta) * radius,
        headY,
        speed: (2 + Math.random() * 5) * worldCell * layerSpeed,
        cell: Math.floor(headY / worldCell),
        trail: Array.from({ length: TRAIL }, glyph),
      };
    };

    const setup = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      if (w < 2 || h < 2) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      focal = w / 2 / Math.tan(hfov / 2);
      vHalf = Math.tan(hfov / 2) * (h / w);
      // Square glyphs at the near wall's center: projected size = baseCell.
      worldCell = (baseCell * (1 - CAMERA_OFFSET)) / focal;

      // Same angular step on every curtain, sized so near glyphs tile.
      const step = worldCell;
      const count = Math.ceil((Math.PI * 2) / step);
      curtains = LAYERS.map((layer) => {
        // Band covers the taller visible window at the screen edge.
        const span =
          ((layer.radius - CAMERA_OFFSET) / EDGE_SCALE) * vHalf +
          TRAIL * worldCell;
        const columns: Column[] = new Array(count);
        for (let i = 0; i < count; i++) {
          columns[i] = makeColumn(
            -Math.PI + (i + 0.5) * ((Math.PI * 2) / count),
            layer.radius,
            layer.speed,
            span
          );
        }
        return { layer, span, columns };
      });
    };

    /** Camera-relative point after yaw (look right) and pitch (look up). */
    const viewOf = (x: number, y: number, z: number, yaw: number, pitch: number) => {
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
    };

    const render = (yaw: number, pitch: number, flicker: boolean) => {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, w, h);

      for (const curtain of curtains) {
        const { layer, columns } = curtain;
        const frontDist = layer.radius - CAMERA_OFFSET;
        for (const col of columns) {
          let dTheta = col.theta - yaw;
          dTheta = Math.atan2(Math.sin(dTheta), Math.cos(dTheta));
          if (Math.abs(dTheta) > VIEW_MARGIN) continue;

          const origin = viewOf(col.x, 0, col.z, yaw, pitch);
          if (origin.z >= -NEAR_CLIP) continue;
          const dist = Math.hypot(origin.x, origin.z);
          const size = (worldCell / dist) * focal;
          if (size < 1.25) continue;
          const shade = Math.min(1, frontDist / dist);

          ctx.font = `${Math.round(size * 2) / 2}px ${FONT_FAMILY}`;
          const boundary = (col.cell + 1) * worldCell;

          const paint = (ch: string, y: number, alpha: number, color: string) => {
            const v = viewOf(col.x, y, col.z, yaw, pitch);
            if (v.z >= -NEAR_CLIP) return;
            const depth = -v.z;
            const sx = w / 2 + (v.x / depth) * focal;
            const sy = h / 2 - (v.y / depth) * focal;
            if (sx < -size || sx > w + size || sy < -size || sy > h + size) return;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.fillText(ch, sx, sy);
          };

          for (let i = TRAIL - 1; i >= 0; i--) {
            const fade = 1 - (i + 1) / (TRAIL + 1);
            paint(
              col.trail[i],
              boundary + i * worldCell,
              rt.alpha * layer.alpha * shade * fade,
              rt.trail
            );
          }
          paint(
            flicker ? glyph() : col.trail[0],
            col.headY,
            rt.alpha * layer.alpha * shade,
            rt.head
          );
        }
      }
      ctx.globalAlpha = 1;
    };

    const respawn = (col: Column, span: number, layerSpeed: number) => {
      col.headY = span + Math.random() * worldCell * 6;
      col.speed = (2 + Math.random() * 5) * worldCell * layerSpeed;
      col.cell = Math.floor(col.headY / worldCell);
      for (let i = 0; i < TRAIL; i++) col.trail[i] = glyph();
    };

    setup();
    if (w < 2) return;
    if (reducedMotion) render(0, 0, false);

    const mouse = { x: 0, y: 0 };
    const look = { yaw: 0, pitch: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let last = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      for (const curtain of curtains) {
        for (const col of curtain.columns) {
          col.headY -= col.speed * dt;
          let guard = 0;
          while (col.cell > Math.floor(col.headY / worldCell) && guard++ < 8) {
            col.cell -= 1;
            col.trail.pop();
            col.trail.unshift(glyph());
          }
          if (col.headY < -curtain.span) {
            respawn(col, curtain.span, curtain.layer.speed);
          }
        }
      }

      const k = 1 - Math.pow(0.965, dt * 60);
      look.yaw += (mouse.x * MOUSE_YAW - look.yaw) * k;
      look.pitch += (-mouse.y * MOUSE_PITCH - look.pitch) * k;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      const eased = p * p * (3 - 2 * p);
      const scrollYaw = -YAW_SWING + eased * (YAW_SWING * 2);

      render(scrollYaw + look.yaw, look.pitch, true);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(rafId);
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => cancelAnimationFrame(rafId);

    const onResize = () => {
      setup();
      if (reducedMotion) render(0, 0, false);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("resize", onResize);
    if (!reducedMotion) {
      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
