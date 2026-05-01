"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import { TechStack } from "@/components/tech-stack";
import type { Project, ProjectImage } from "@/content/site";
import { cn } from "@/lib/utils";

const projectLinkClassName =
  "inline-flex items-center rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "grid gap-3 lg:items-start",
        project.images && "lg:grid-cols-[minmax(0,1fr)_18rem]",
      )}
    >
      <article className="group rounded-md border border-border bg-card p-4 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-accent/35 focus-within:-translate-y-0.5 focus-within:border-primary/35 focus-within:bg-accent/35 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-medium text-card-foreground">
                {project.name}
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-primary/25 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {project.status}
              </span>
            </div>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {project.category}
            </p>
          </div>

          {project.href || project.sourceHref ? (
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              {project.href ? (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={projectLinkClassName}
                >
                  Live
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              ) : null}
              {project.sourceHref ? (
                <Link
                  href={project.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className={projectLinkClassName}
                >
                  Source
                  <Github className="ml-1 h-4 w-4" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        <TechStack items={project.stack} />
      </article>

      {project.images ? (
        <aside
          className="group overflow-hidden rounded-md border border-border bg-card transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-accent/35 focus-within:-translate-y-0.5 focus-within:border-primary/35 focus-within:bg-accent/35"
          aria-label={`${project.name} screenshots`}
        >
          <div className="mx-auto w-full max-w-[18rem] lg:max-w-none">
            <ProjectPreview
              href={project.href}
              images={project.images}
              name={project.name}
            />
          </div>
        </aside>
      ) : null}
    </div>
  );
}

type ProjectPreviewProps = {
  href?: string;
  images: readonly ProjectImage[];
  name: string;
};

function ProjectPreview({ href, images, name }: ProjectPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  const preview = (
    <div className="relative w-full overflow-hidden rounded-md bg-secondary">
      <div className="relative aspect-[144/110]">
        {images.map((image, index) => (
          <Image
            key={image.src.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 288px, 288px"
            aria-hidden={index !== activeIndex}
            className={cn(
              "object-cover transition-opacity duration-1000 ease-out",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      {images.length > 1 ? (
        <div
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
          aria-label={`${name} screenshot ${activeIndex + 1} of ${images.length}`}
        >
          {images.map((image, index) => (
            <span
              key={image.src.src}
              className={cn(
                "h-1.5 rounded-full transition-[background-color,width] duration-300",
                index === activeIndex
                  ? "w-5 bg-primary"
                  : "w-1.5 bg-foreground/45",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );

  if (!href) {
    return preview;
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${name}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {preview}
    </Link>
  );
}
