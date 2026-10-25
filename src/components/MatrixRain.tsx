"use client";

import { useRef } from "react";
import { useTheme } from "@/i18n/theme";
import { useMatrixRain } from "@/hooks/useMatrixRain";

/**
 * Full-screen Matrix rain backdrop.
 * The heavy canvas logic lives in useMatrixRain so this component stays
 * focused on markup and accessibility.
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useMatrixRain(canvasRef, theme);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
