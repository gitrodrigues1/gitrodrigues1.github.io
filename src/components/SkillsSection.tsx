"use client";

import {
  FaAws,
  FaCheck,
  FaDatabase,
  FaDocker,
  FaGit,
  FaJava,
  FaJenkins,
  FaJs,
  FaNodeJs,
} from "react-icons/fa6";
import { SiMysql, SiNestjs, SiRedis, SiSpringboot } from "react-icons/si";
import type { IconType } from "react-icons";
import Reveal from "./Reveal";
import Section from "./Section";
import { useI18n } from "@/i18n/locale";

const devIcons: { name: string; Icon: IconType }[] = [
  { name: "Java", Icon: FaJava },
  { name: "Spring Boot", Icon: SiSpringboot },
  { name: "NestJS", Icon: SiNestjs },
  { name: "Node.js", Icon: FaNodeJs },
  { name: "JavaScript", Icon: FaJs },
  { name: "AWS", Icon: FaAws },
  { name: "SQL Server", Icon: FaDatabase },
  { name: "MySQL", Icon: SiMysql },
  { name: "Redis", Icon: SiRedis },
  { name: "Docker", Icon: FaDocker },
  { name: "Git", Icon: FaGit },
  { name: "Jenkins", Icon: FaJenkins },
];

export default function SkillsSection() {
  const { content } = useI18n();
  const { ui } = content;

  return (
    <Section id="skills" title={ui.skillsTitle}>
      <Reveal>
        <h3 className="mb-4 font-heading text-xl font-bold uppercase tracking-[0.15em] text-slate-200 sm:text-2xl">
          {ui.skillsLanguages}
        </h3>
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {devIcons.map(({ name, Icon }, i) => (
            <li key={name}>
              <Reveal delay={i * 0.05}>
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
          {ui.skillsStack}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.stackGroups.map(({ title, items }) => (
            <div
              key={title}
              className="rounded-xl border border-line/70 bg-surface/50 p-5 transition-colors duration-300 hover:border-accent/40"
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {title}
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-ink/60 px-3 py-1 text-xs text-slate-300 transition-colors duration-200 hover:border-primary/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <h3 className="mb-4 font-heading text-xl font-bold uppercase tracking-[0.15em] text-slate-200 sm:text-2xl">
          {ui.skillsPractices}
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.practices.map((item) => (
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
