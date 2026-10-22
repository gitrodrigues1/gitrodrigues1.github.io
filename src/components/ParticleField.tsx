"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { useTheme } from "@/i18n/theme";

interface FieldTheme {
  palette: string[];
  fog: number;
  icosa: number;
  particleOpacity: number;
  wireOpacity: number;
  /** Additive glow only reads well against a dark page. */
  additive: boolean;
  bloom: boolean;
}

const FIELD_THEMES: Record<"dark" | "light", FieldTheme> = {
  dark: {
    palette: ["#ff7a4d", "#22d3ee", "#fbbf24", "#e2e8f0", "#a78bfa"],
    fog: 0x07080f,
    icosa: 0x22d3ee,
    particleOpacity: 0.9,
    wireOpacity: 0.15,
    additive: true,
    bloom: true,
  },
  light: {
    // Darker, saturated colors so particles read on a white page.
    palette: ["#c2410c", "#0e7490", "#b45309", "#475569", "#6d28d9"],
    fog: 0xf4f6fa,
    icosa: 0x0e7490,
    particleOpacity: 0.65,
    wireOpacity: 0.2,
    additive: false,
    bloom: false,
  },
};

/**
 * Fixed full-screen three.js backdrop:
 * - a drifting field of glowing particles
 * - wireframe icosahedron "monolith"
 * - UnrealBloom glow + additive blending (dark theme, desktop only)
 * - mouse parallax + gentle scroll-driven rotation
 * Rebuilds when the theme changes.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ft = FIELD_THEMES[theme];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const useBloom = ft.bloom && !isMobile;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(ft.fog, 0.022);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 120);
    camera.position.set(0, 0, 11);

    const world = new THREE.Group();
    scene.add(world);

    // ---- Particle field -----------------------------------------------------
    const count = isMobile ? 900 : 2400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 64;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 36 - 6;
      color.set(ft.palette[Math.floor(Math.random() * ft.palette.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: ft.particleOpacity,
      sizeAttenuation: true,
      blending: ft.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    world.add(particles);

    // ---- Wireframe shape ------------------------------------------------------
    const icosaMat = new THREE.MeshBasicMaterial({
      color: ft.icosa,
      wireframe: true,
      transparent: true,
      opacity: ft.wireOpacity,
      blending: ft.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const icosa = new THREE.Mesh(new THREE.IcosahedronGeometry(1.9, 1), icosaMat);
    icosa.position.set(-7, -1.5, -8);
    world.add(icosa);

    // ---- Post-processing ------------------------------------------------------
    let composer: EffectComposer | null = null;
    if (useBloom) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.85, 0.7, 0.2);
      composer.addPass(bloom);
      composer.addPass(new OutputPass());
    }

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      composer?.setSize(w, h);
    };
    resize();

    // ---- Interaction --------------------------------------------------------
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const clock = new THREE.Clock();
    let rafId = 0;

    const render = () => {
      if (composer) composer.render();
      else renderer.render(scene, camera);
    };

    const tick = () => {
      const t = clock.getElapsedTime();

      particles.rotation.y = t * 0.025 + scrollY * 0.00018;
      particles.rotation.x = Math.sin(t * 0.08) * 0.06;
      icosa.rotation.x = -t * 0.12;
      icosa.rotation.y = t * 0.2;

      camera.position.x += (mouse.x * 1.6 - camera.position.x) * 0.035;
      camera.position.y += (-mouse.y * 1.0 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, -6);

      render();
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => cancelAnimationFrame(rafId);

    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("resize", resize);
    if (!reducedMotion) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      start();
    } else {
      render(); // single static frame for reduced-motion users
    }

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      composer?.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      icosa.geometry.dispose();
      icosaMat.dispose();
      renderer.dispose();
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
