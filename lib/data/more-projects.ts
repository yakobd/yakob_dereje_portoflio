export type MoreProject = {
  /** URL segment for /work/<slug>. Must not clash with a case study slug. */
  slug: string;
  title: string;
  /** Banner initials; derived from the title when unset. */
  initials?: string;
  summary: string;
  stack: string[];
  /** Screenshot for the card and detail page; generated banner if unset. */
  coverImageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Image paths for the detail page gallery, e.g. "/projects/<slug>-1.png". */
  screenshots?: string[];
};

export const moreProjects: MoreProject[] = [
  {
    slug: "bete-dokimas-website",
    liveUrl: "https://betedokimas.com",
    coverImageUrl: "/projects/bete-dokimas-website-1.jpg",
    screenshots: [
      "/projects/bete-dokimas-website-1.jpg",
      "/projects/bete-dokimas-website-2.jpg",
    ],
    title: "Bete Dokimas — Website",
    summary:
      "Bilingual marketing site with a full self-service admin CMS, migrated to self-hosted infra with zero downtime.",
    stack: ["Next.js", "Supabase"],
  },
  {
    slug: "kenean-cafe",
    title: "Kenean Café & Restaurant Platform",
    summary:
      "Full-stack restaurant ordering platform with digital menu and admin dashboard.",
    stack: ["Next.js", "Supabase"],
  },
  {
    slug: "nablis-ministry-app",
    title: "Nablis Ministry App",
    summary:
      "Spiritual community platform — Next.js web app and Expo React Native mobile app in one monorepo.",
    stack: ["Next.js", "Expo", "Firebase"],
  },
  {
    slug: "ai-interview-guide",
    title: "AI Interview Guide",
    initials: "IG",
    summary: "AI-powered interview prep platform with real-time voice chat.",
    stack: ["Next.js", "Voice API"],
  },
  {
    slug: "dereje-negash-portfolio",
    title: "Dereje Negash — Accountant Portfolio",
    summary:
      "Professional portfolio site for a certified accountant with services and testimonials.",
    stack: ["Next.js", "Supabase"],
  },
  {
    slug: "ai-native-ide",
    title: "AI-Native IDE & Intent Traceability",
    initials: "AN",
    summary:
      "Deterministic hook system tracing AI agent code edits back to business intent.",
    stack: ["TypeScript", "VS Code API"],
  },
  {
    slug: "brownfield-cartographer",
    title: "Brownfield Cartographer",
    summary:
      "Agentic codebase intelligence system that maps architecture and visualizes data lineage.",
    stack: ["Python", "Streamlit"],
  },
  {
    slug: "the-ledger",
    title: "The Ledger",
    initials: "TL",
    summary:
      "Event-sourced financial orchestration engine for async multi-agent loan processing.",
    stack: ["Python", "PostgreSQL"],
  },
  {
    slug: "data-contract-enforcer",
    title: "The Data Contract Enforcer",
    summary:
      "Schema and lineage-attribution system that turns agent data hand-offs into checked contracts.",
    stack: ["Python", "Pandas"],
  },
  {
    slug: "oracle-forge",
    title: "Oracle Forge",
    summary:
      "Natural language analytics agent answering questions across four database systems.",
    stack: ["Python", "FastAPI", "Gemini 2.0"],
  },
  {
    slug: "conversion-engine",
    title: "The Conversion Engine",
    summary:
      "AI-powered lead conversion pipeline using multi-step LLM reasoning.",
    stack: ["Python", "LangChain"],
  },
  {
    slug: "sales-agent-eval-bench",
    title: "Sales Agent Evaluation Bench",
    summary:
      "Evaluation framework benchmarking LLM sales-agent conversation quality.",
    stack: ["Python", "LLM Eval"],
  },
];

export function getMoreProject(slug: string) {
  const index = moreProjects.findIndex((project) => project.slug === slug);
  return index === -1 ? undefined : { project: moreProjects[index], index };
}
