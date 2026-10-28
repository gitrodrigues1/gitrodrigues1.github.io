"use client";

import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Section from "./Section";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/locale";

export default function ProjectsSection() {
  const { content } = useI18n();
  const { projects, ui } = content;

  return (
    <Section id="projects" title={ui.projectsTitle}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.1}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line/60 bg-surface/50 transition-all duration-200 hover:border-primary/40 hover:bg-surface/70">
              {/* Snapshots preview */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line/60 bg-ink/40">
                <Image
                  src={project.snapshots[0]}
                  alt={`${project.title} desktop preview`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {project.snapshots[1] && (
                  <div className="absolute bottom-3 right-3 w-[22%] overflow-hidden rounded-lg border-2 border-line shadow-lg">
                    <div className="relative aspect-[9/19.5] w-full">
                      <Image
                        src={project.snapshots[1]}
                        alt={`${project.title} mobile preview`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-fg-strong">
                    {project.title}
                  </h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar ${project.title}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-ink/60 text-fg-soft transition-colors hover:border-primary hover:text-primary"
                  >
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </a>
                </div>

                <p className="mt-3 flex-1 leading-relaxed text-fg">
                  {project.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line bg-ink/60 px-3 py-1 text-xs text-fg-soft"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
