"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Fades content up into view on scroll (skipped for reduced-motion users). */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.7, delay, ease: "easeOut" }
      }
    >
      {children}
    </motion.div>
  );
}
