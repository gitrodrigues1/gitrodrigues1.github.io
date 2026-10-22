"use client";

import { FaAws, FaCheck, FaDatabase, FaJava, FaJs, FaNodeJs, FaReact } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Reveal from "./Reveal";
import Section from "./Section";
import { workflow } from "@/data/resume";

const devIcons: { name: string; Icon: IconType }[] = [
  { name: "Java", Icon: FaJava },
  { name: "AWS", Icon: FaAws },
  { name: "JavaScript", Icon: FaJs },
  { name: "React", Icon: FaReact },
  { name: "Node.js", Icon: FaNodeJs },
  // No brand glyph for SQL Server in the installed icon packs — generic database.
  { name: "SQL Server", Icon: FaDatabase },
];

export default function SkillsSection() {
  return (
    <Section id="skills" title="Skills">
      <Reveal>
        <h3 className="mb-4 font-heading text-xl font-bold uppercase tracking-[0.15em] text-slate-200 sm:text-2xl">
          Programming Languages &amp; Tools
        </h3>
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {devIcons.map(({ name, Icon }, i) => (
            <li key={name}>
              <Reveal delay={i * 0.06}>
                <div
                  title={name}
                  className="group flex h-24 flex-col items-center justify-center gap-2 rounded-xl border border-line/70 bg-surface/60 text-3xl text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:text-primary hover:shadow-[0_8px_30px_-12px_rgba(255,122,77,0.4)]"
                >
                  <Icon />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-primary-soft">
                    {name}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <h3 className="mb-4 font-heading text-xl font-bold uppercase tracking-[0.15em] text-slate-200 sm:text-2xl">
          Workflow
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {workflow.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-lg border border-line/50 bg-surface/40 px-4 py-3 text-slate-300"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-xs text-green-400">
                <FaCheck />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
