export type CaseStudy = {
  slug: string;
  initials: string;
  /** Cover block background, as a hex color. */
  coverColor: string;
  tag: string;
  title: string;
  summary: string;
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bete-dokimas-clients",
    initials: "BD",
    coverColor: "#B5651D",
    tag: "Multi-tenant · Live",
    title: "Bete Dokimas — Digital Wedding Experience",
    summary:
      "A multi-tenant platform combining a guest QR-code experience, a couple's portal, and a staff operations suite — piloted live on a real wedding.",
    stack: ["Next.js 14", "Supabase", "TypeScript"],
  },
  {
    slug: "hiruy-learn",
    initials: "HL",
    coverColor: "#3B6E5E",
    tag: "Ed-tech · Live",
    title: "Hiruy Learn — Bootcamp LMS",
    summary:
      "A production LMS for a 35+ student bootcamp: 25+ tables, a 4-factor grading engine, and live attendance tracking.",
    stack: ["Next.js 14", "Supabase", "YouTube API"],
  },
  {
    slug: "hiruy-platform",
    initials: "HT",
    coverColor: "#8A4B2E",
    tag: "Company platform · Live",
    title: "Hiruy Technologies Platform",
    summary:
      "The company's production site doubling as an operating system: CRM, finance module, and quote pipeline.",
    stack: ["Next.js 14", "Supabase", "Cloudflare"],
  },
  {
    slug: "doc-intelligence",
    initials: "DR",
    coverColor: "#5B4A6F",
    tag: "AI · RAG",
    title: "Doc-Intelligence Refinery",
    summary:
      "An enterprise document-intelligence pipeline that classifies, extracts, and indexes fiscal data using forensic triage routing.",
    stack: ["Python", "LangGraph", "Gemini 1.5"],
  },
  {
    slug: "automaton-auditor",
    initials: "AA",
    coverColor: "#3E5C76",
    tag: "Multi-agent system",
    title: "Automaton Auditor",
    summary:
      "A multi-agent 'Digital Courtroom' running Detective, Prosecutor, Defense, and Judge agents for deterministic code review.",
    stack: ["Python", "LangGraph", "Pydantic"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
