import type { StaticImageData } from "next/image";

import generateImage from "@/assets/Generate.png";
import savedImage from "@/assets/Saved.png";
import statsImage from "@/assets/Stats.png";

export type ProjectStatus = "Live";

export type ProjectImage = {
  src: StaticImageData;
  alt: string;
};

export type Project = {
  name: string;
  description: string;
  status: ProjectStatus;
  category: string;
  href?: string;
  sourceHref?: string;
  stack: readonly string[];
  images?: readonly ProjectImage[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin";
};

export const projects = [
  {
    name: "Recipe Forge",
    href: "https://recipe.justinhdev.com",
    sourceHref: "https://github.com/justinhdev/recipe-forge",
    description:
      "Full-stack TypeScript AI workflow with structured OpenAI outputs, JWT APIs, Prisma/Postgres persistence, CI, and token/cost/latency observability.",
    status: "Live",
    category: "Full-stack AI app",
    stack: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "Postgres",
      "Prisma",
      "OpenAI",
      "Tailwind CSS",
      "Zod",
      "JWT",
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
    images: [
      {
        src: generateImage,
        alt: "Recipe Forge generator screen with meal preferences and generated recipe output.",
      },
      {
        src: savedImage,
        alt: "Recipe Forge saved recipes screen with recipe cards and filtering.",
      },
      {
        src: statsImage,
        alt: "Recipe Forge recipe details screen showing nutrition and macro stats.",
      },
    ],
  },
] as const satisfies readonly Project[];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/justinhdev",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/justin-lee-hancock/",
    icon: "linkedin",
  },
] as const satisfies readonly SocialLink[];
