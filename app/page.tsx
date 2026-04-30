import Link from "next/link";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "Recipe Forge",
    href: "https://recipe.justinhdev.com",
    sourceHref: "https://github.com/justinhdev/recipe-forge",
    description:
      "Full-stack AI recipe generator with saved recipes, macro breakdowns, authenticated persistence, and production-style observability.",
    status: "Live",
    stack: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma ORM",
      "OpenAI API",
      "Zod",
      "JWT authentication",
      "Tailwind CSS",
      "Vite",
      "Axios",
      "Framer Motion",
      "Pino",
      "Vitest",
      "Supertest",
      "Vercel",
      "Render",
      "Neon PostgreSQL",
      "GitHub Actions",
    ],
  },
] as const;

const links = [
  {
    label: "GitHub",
    href: "https://github.com/justinhdev",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/justin-lee-hancock/",
    icon: Linkedin,
  },
] as const;

export default function Home() {
  const liveProjectCount = projects.filter(
    (project) => project.status === "Live",
  ).length;

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-8 sm:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.18em] text-foreground"
          >
            JUSTINHDEV
          </Link>
          <nav className="flex items-center gap-1" aria-label="Primary links">
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <Button key={item.label} asChild variant="ghost" size="icon">
                  <Link href={item.href} aria-label={item.label}>
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
                <article
                  key={project.name}
                  className="group grid gap-4 rounded-md border border-border bg-card p-5 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-accent/35 focus-within:-translate-y-0.5 focus-within:border-primary/35 focus-within:bg-accent/35 sm:grid-cols-[1fr_auto] sm:items-start"
                >
                  <span>
                    <span className="flex items-center gap-3">
                      <span className="text-lg font-medium text-card-foreground">
                        {project.name}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-sm border border-primary/25 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {project.status}
                      </span>
                    </span>
                    <span className="mt-2 block max-w-xl text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </span>
                    {"stack" in project ? (
                      <span className="mt-4 block">
                        <span className="flex flex-wrap gap-2">
                          {project.stack.slice(0, 5).map((item) => (
                            <span
                              key={item}
                              className="rounded-sm border border-border bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                            >
                              {item}
                            </span>
                          ))}
                          {project.stack.length > 5 ? (
                            <span className="rounded-sm border border-primary/25 bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-colors group-hover:bg-primary/15 group-focus-within:bg-primary/15">
                              +{project.stack.length - 5} more
                            </span>
                          ) : null}
                        </span>

                        <span className="grid max-h-0 gap-2 overflow-hidden opacity-0 transition-[max-height,opacity,margin-top] duration-300 group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100 group-focus-within:mt-3 group-focus-within:max-h-40 group-focus-within:opacity-100">
                          <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                            More stack
                          </span>
                          <span className="flex flex-wrap gap-2">
                            {project.stack.slice(5).map((item) => (
                              <span
                                key={item}
                                className="rounded-sm border border-border bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                              >
                                {item}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                    ) : null}
                  </span>
                  {"href" in project || "sourceHref" in project ? (
                    <span className="flex flex-wrap items-center gap-3 sm:justify-end">
                      {"href" in project ? (
                        <Link
                          href={project.href}
                          className="inline-flex items-center rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15 hover:text-primary"
                        >
                          Live
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                      ) : null}
                      {"sourceHref" in project ? (
                        <Link
                          href={project.sourceHref}
                          className="inline-flex items-center rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15 hover:text-primary"
                        >
                          Source
                          <Github className="ml-1 h-4 w-4" />
                        </Link>
                      ) : null}
                    </span>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
