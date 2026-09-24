export type Project = {
  title: string;
  summary: string;
  stack: string[];
};

export const moreProjects: Project[] = [
  {
    title: "Bete Dokimas — Website",
    summary:
      "Bilingual marketing site with a full self-service admin CMS, migrated to self-hosted infra with zero downtime.",
    stack: ["Next.js", "Supabase"],
  },
  {
    title: "Kenean Café & Restaurant Platform",
    summary:
      "Full-stack restaurant ordering platform with digital menu and admin dashboard.",
    stack: ["Next.js", "Supabase"],
  },
  {
    title: "Nablis Ministry App",
    summary:
      "Spiritual community platform — Next.js web app and Expo React Native mobile app in one monorepo.",
    stack: ["Next.js", "Expo", "Firebase"],
  },
  {
    title: "AI Interview Guide",
    summary: "AI-powered interview prep platform with real-time voice chat.",
    stack: ["Next.js", "Voice API"],
  },
  {
    title: "Dereje Negash — Accountant Portfolio",
    summary:
      "Professional portfolio site for a certified accountant with services and testimonials.",
    stack: ["Next.js", "Supabase"],
  },
  {
    title: "AI-Native IDE & Intent Traceability",
    summary:
      "Deterministic hook system tracing AI agent code edits back to business intent.",
    stack: ["TypeScript", "VS Code API"],
  },
  {
    title: "Brownfield Cartographer",
    summary:
      "Agentic codebase intelligence system that maps architecture and visualizes data lineage.",
    stack: ["Python", "Streamlit"],
  },
  {
    title: "The Ledger",
    summary:
      "Event-sourced financial orchestration engine for async multi-agent loan processing.",
    stack: ["Python", "PostgreSQL"],
  },
  {
    title: "The Data Contract Enforcer",
    summary:
      "Schema and lineage-attribution system that turns agent data hand-offs into checked contracts.",
    stack: ["Python", "Pandas"],
  },
  {
    title: "Oracle Forge",
    summary:
      "Natural language analytics agent answering questions across four database systems.",
    stack: ["Python", "FastAPI", "Gemini 2.0"],
  },
  {
    title: "The Conversion Engine",
    summary:
      "AI-powered lead conversion pipeline using multi-step LLM reasoning.",
    stack: ["Python", "LangChain"],
  },
  {
    title: "Sales Agent Evaluation Bench",
    summary:
      "Evaluation framework benchmarking LLM sales-agent conversation quality.",
    stack: ["Python", "LLM Eval"],
  },
];
