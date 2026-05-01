import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { projects, socialLinks } from "@/content/site";

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
};

export default function Home() {
  const liveProjectCount = projects.filter(
    (project) => project.status === "Live",
  ).length;

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.18em] text-foreground"
          >
            JUSTINHDEV
          </Link>
          <nav className="flex items-center gap-1" aria-label="Primary links">
            {socialLinks.map((item) => {
              const Icon = socialIconMap[item.icon];

              return (
                <Button key={item.label} asChild variant="ghost" size="icon">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                </Button>
              );
            })}
          </nav>
        </header>

        <section id="projects" className="pt-24 pb-16">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Projects
            </h2>
            <span className="text-sm text-muted-foreground">
              {liveProjectCount} live
            </span>
          </div>

          <div className="w-full border-t border-border pt-8">
            <div className="grid gap-3">
              {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
