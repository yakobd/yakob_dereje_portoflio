export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / Agents",
    skills: [
      "LangGraph",
      "Multi-agent orchestration",
      "RAG & document intelligence",
      "MCP",
      "LLM-as-judge / evaluation",
      "LoRA / PEFT fine-tuning",
    ],
  },
  {
    title: "Full-Stack",
    skills: [
      "Next.js 14 (App Router)",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend / Data",
    skills: [
      "Supabase (Postgres, RLS)",
      "PostgreSQL",
      "FastAPI",
      "Python",
      "Row-Level Security design",
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      "Self-hosted VPS (Ubuntu)",
      "Nginx + PM2",
      "Cloudflare DNS/CDN",
      "Docker",
      "CI/CD via SSH deploy",
    ],
  },
];
