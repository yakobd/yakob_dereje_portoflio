import type { BannerPattern } from "@/lib/banner";

export type Challenge = {
  title: string;
  description: string;
};

export type CaseStudy = {
  slug: string;
  initials: string;
  /** Home-page card cover and case study hero background, as a hex color. */
  heroColor: string;
  /** Generated banner pattern used when there's no coverImageUrl. */
  pattern: BannerPattern;
  /** Short category label on the home-page card. */
  tag: string;
  /**
   * Screenshot used on the home card and case study hero, e.g.
   * "/projects/<slug>.png". Leave unset to use the color + initials cover.
   */
  coverImageUrl?: string;
  /** Longer category line in the case study hero. */
  heroTag: string;
  title: string;
  /** One-line summary for the home-page card. */
  summary: string;
  /** Short stack list for the home-page card. */
  stack: string[];
  problem: string;
  /** Bullet points, or a single paragraph. */
  role: string | string[];
  fullStack: string[];
  challenges?: Challenge[];
  features?: string[];
  outcomes?: string[];
  /** "Notable Approach" paragraph, for the lighter studies. */
  approach?: string;
  linkUrl: string;
  linkLabel: "View live" | "View repo";
  /** Image paths for a future gallery, e.g. "/projects/<slug>-1.png". */
  screenshots?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bete-dokimas-clients",
    coverImageUrl: "/projects/bete-dokimas-clients-1.jpg",
    // bete-dokimas-clients-3.jpg is an empty file; add it here once replaced.
    screenshots: [
      "/projects/bete-dokimas-clients-1.jpg",
      "/projects/bete-dokimas-clients-2.jpg",
    ],
    initials: "BD",
    pattern: "circles",
    heroColor: "#B5651D",
    tag: "Multi-tenant · Live",
    heroTag: "Multi-tenant platform · AI-directed build · Live production",
    title: "Bete Dokimas — Digital Wedding Experience",
    summary:
      "A multi-tenant platform combining a guest QR-code experience, a couple's portal, and a staff operations suite — piloted live on a real wedding.",
    stack: ["Next.js 14", "Supabase", "TypeScript"],
    problem:
      "Bete Dokimas EOTC Wedding Planners had no digital layer for the weddings they run — invitations, RSVPs, guest photo/wish collection, and internal staff coordination were all manual or paper-based. Two groups needed solving for: guests, who had no way to RSVP or share photos/wishes without a login, and the company itself — admins, coordinators, and couples — who needed one shared system across every client wedding, not just one.",
    role: [
      "Sole technical architect and engineering lead — product owner, system designer, DevOps engineer, and QA, directing an AI coding agent as an implementation partner rather than writing every line by hand.",
      "Made every architectural and product decision: multi-tenant data model, role/permission design, feature scope, and UX direction.",
      "Owned all infrastructure personally — VPS provisioning, Nginx configuration, PM2, Cloudflare DNS, Let's Encrypt SSL, and a live domain-registrar incident resolved mid-outage.",
      "Performed hands-on verification at every step — real multi-account and multi-device testing — and personally diagnosed and fixed a live production bug during the actual wedding day.",
    ],
    fullStack: [
      "Next.js 14 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Supabase (Postgres, Auth, Storage, RLS)",
      "next-intl (EN/Amharic)",
      "Resend (transactional email)",
      "Nginx + PM2 + Cloudflare",
    ],
    challenges: [
      {
        title: "Granular, per-role checklist permission system",
        description:
          "Built a Trello-like nested checklist feature where cards can be private by default, including to the admin role — a deliberate deviation from the rest of the system. Sharing is opt-in and atomic: View / Check-items / Add-items / Edit-items / Add-subcards, independently, per role. Required a custom SECURITY DEFINER Postgres function to avoid infinite RLS recursion, plus a trigger-enforced max nesting depth that walks descendant cards on re-parenting.",
      },
      {
        title: "A non-obvious RLS bug found through layered debugging",
        description:
          "Card creation failed for every role with a generic row-level security error. Methodically ruled out the policy text, permissive-vs-restrictive status, target roles, table and column grants, trigger logic, and the JWT claims — before finding the actual cause: Supabase's client issues INSERT ... RETURNING by default, which subjects the returned row to the table's SELECT policy too, not just INSERT.",
      },
      {
        title: "A live production incident during the actual wedding",
        description:
          "Guest wishes and photos stopped rendering on the couple's dashboard, but only at real content volume (66 wishes, 111 photos), never in testing. Root cause: Framer Motion's whileInView threshold is measured against the animated element's own height, not the viewport — once a list grows past ~10x a viewport's height, visibility becomes mathematically impossible to satisfy. Diagnosed, fixed, and deployed live during the event, then swept the codebase for the same pattern.",
      },
    ],
    features: [
      "Full bilingual guest experience (EN/Amharic) including wedding hymn (mezmur) lyrics and Ethiopian Orthodox iconography in the design language.",
      "QR-code-driven guest journeys: a personalized per-guest invitation, a shared table QR for photos and wishes, and a separate story-only QR for physical thank-you cards.",
      "Automatic post-wedding lifecycle: the guest upload flow self-locks one day after the wedding, while the couple's story stays visible indefinitely.",
      "One-click 'Download All Memories' — generates a ZIP client-side with every guest photo plus a self-contained HTML document of every wish, no server dependency once downloaded.",
      "Per-partner task visibility enforced at the database level, and a role-spanning coordinator system that works identically across every client the company serves.",
    ],
    outcomes: [
      "Deployed and used live for a real wedding (September 2026), with 66 wishes and 111 photos submitted through the table QR code in a single event.",
      "Built as a genuine multi-tenant platform — the same codebase serves any number of future weddings without re-engineering.",
      "Runs as one of five production sites self-hosted on a single VPS, migrated mid-project from Vercel to full self-hosting with zero downtime for live wedding traffic.",
    ],
    linkUrl: "https://couples.betedokimas.com",
    linkLabel: "View live",
  },
  {
    slug: "hiruy-learn",
    coverImageUrl: "/projects/hiruy-learn-1.jpg",
    screenshots: ["/projects/hiruy-learn-1.jpg", "/projects/hiruy-learn-2.jpg"],
    initials: "HL",
    pattern: "dots",
    heroColor: "#3B6E5E",
    tag: "Ed-tech · Live",
    heroTag: "Ed-tech platform · Solo build · Live production",
    title: "Hiruy Learn — Bootcamp LMS",
    summary:
      "A production LMS for a 35+ student bootcamp: 25+ tables, a 4-factor grading engine, and live attendance tracking.",
    stack: ["Next.js 14", "Supabase", "YouTube API"],
    problem:
      "Hiruy Technologies runs a Full-Stack Web Development Bootcamp for 35+ students in Addis Ababa. No existing platform fit the specific Ethiopian bootcamp context — payment flows, Amharic-aware design, WhatsApp/Telegram-based communication. Grade tracking was manual across spreadsheets with no transparency for students, and there was no way to deliver structured content, track progress, or manage live-session attendance at scale.",
    role: [
      "Designed the full system architecture and built every layer personally — no agency, no team handoff.",
      "Designed the entire database schema (25+ tables in Supabase) from scratch, including the RLS policy architecture and the multi-factor weighted grading model.",
      "Built the role-based access system (superadmin / admin / teacher / student) with middleware-enforced routing and per-course permission grants.",
      "Made all product decisions: what features to include, how grading works, what students can see vs. admins, and phase-based content unlocking.",
    ],
    fullStack: [
      "Next.js 14 (App Router, TypeScript)",
      "Tailwind CSS",
      "Framer Motion",
      "Supabase (Postgres, RLS)",
      "Supabase Auth (JWT)",
      "YouTube IFrame API",
      "Hostinger VPS · PM2 · Nginx",
    ],
    challenges: [
      {
        title: "RLS infinite recursion at scale",
        description:
          "Row Level Security policies that referenced the profiles table inside other profiles policies caused infinite recursion, silently returning empty results and breaking the admin dashboard, grade displays, and progress tracking in production. Identified the recursive pattern across 15+ tables and replaced the checks with JWT-based logic and middleware-level route protection instead.",
      },
      {
        title: "Video watch progress resetting between sessions",
        description:
          "The YouTube IFrame API polls playback position starting from 0 on every page load, immediately overwriting the stored progress value. Solved with a storedProgressRef pattern — a React ref populated on mount from Supabase — that only upserts when the new percentage is higher than the stored one, preserving progress across sessions.",
      },
      {
        title: "Multi-factor grading consistency across 4 pages",
        description:
          "An audit revealed total_score was calculated with 4 different formulas scattered across the codebase — an unweighted average in one place, a 3-factor formula in another, the correct 4-factor formula only on the attendance page. Standardized every page to one canonical weighted formula and fixed the upserts that were silently dropping fields on partial updates.",
      },
    ],
    features: [
      "Phase-based content unlocking with collapsible phase accordions that persist state and always keep the current phase open.",
      "Missed-session live recording system — students who missed a session see it marked 'Required,' with mandatory watch tracking; attended sessions are optional.",
      "Privacy-preserving leaderboard — top 3 shown by name, everyone else as 'Student #N,' with weeks excluded from grading silently filtered out.",
      "Batch grade-sync buttons that recalculate task and assignment scores from raw activity data with one click.",
      "An 18-hour late-submission window with automatic flagging, and a full role-based sidebar with live unread notification badges.",
    ],
    outcomes: [
      "35+ active students enrolled in the first cohort of the Hiruy Full-Stack Bootcamp.",
      "4 staff roles (superadmin, 2 admins, 1 teacher) actively managing the platform.",
      "25+ database tables handling the full student lifecycle from registration to graded assessments.",
      "Replaced entirely manual spreadsheet-based grade tracking with an automated system calculating weighted scores from raw activity data.",
    ],
    linkUrl: "https://learn.hiruytech.com",
    linkLabel: "View live",
  },
  {
    slug: "hiruy-platform",
    coverImageUrl: "/projects/hiruy-platform-1.jpg",
    screenshots: [
      "/projects/hiruy-platform-1.jpg",
      "/projects/hiruy-platform-2.jpg",
    ],
    initials: "HT",
    pattern: "hex",
    heroColor: "#8A4B2E",
    tag: "Company platform · Live",
    heroTag: "Company platform · Solo build · Live production",
    title: "Hiruy Technologies Platform",
    summary:
      "The company's production site doubling as an operating system: CRM, finance module, and quote pipeline.",
    stack: ["Next.js 14", "Supabase", "Cloudflare"],
    problem:
      "Hiruy Technologies needed a professional web presence that wasn't just a brochure site — it needed to actually run the business. The platform handles client inquiries, tracks finances in ETB and USD, manages waitlists for training programs, processes quote requests end to end, and gives the founding team a single dashboard to operate everything without third-party tools.",
    role: "Designed and built everything solo — architecture decisions, database schema, every component, deployment pipeline, DNS configuration, and email infrastructure. Chose Supabase over a custom backend, chose a self-hosted VPS over managed hosting for cost control, set up Cloudflare to solve Ethiopian ISP blocking, integrated Resend for transactional email, and debugged every production issue personally, including RLS policy failures, UUID coercion bugs, and port conflicts across three co-hosted Next.js apps.",
    fullStack: [
      "Next.js 14 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Supabase (Postgres, RLS, Storage)",
      "Resend (verified custom domain)",
      "Hostinger VPS (Ubuntu, PM2, Nginx)",
      "Cloudflare (CDN, DDoS, ISP bypass)",
    ],
    challenges: [
      {
        title: "Supabase 400 errors in production only",
        description:
          "All Supabase reads failed with 400 Bad Request after deploying. Root cause: the new sb_publishable_ key format was incompatible with the installed @supabase/ssr version. Diagnosed by reading PostgREST logs, traced to a token refresh failure, and fixed by switching to the legacy anon key format.",
      },
      {
        title: "Ethiopian ISP blocking the VPS IP",
        description:
          "After full deployment, the site was unreachable from Ethiopian networks even with VPN off. Diagnosed by SSHing into the server and confirming it was healthy but the IP was blocked at the ISP level. Fixed by routing all traffic through Cloudflare's proxy, replacing the VPS IP with Cloudflare's globally distributed IPs that Ethiopian ISPs don't block.",
      },
      {
        title: "UUID empty-string bug causing silent insert failures",
        description:
          "Finance module inserts appeared to save via optimistic UI updates but weren't actually persisted. The error was an invalid UUID syntax — optional foreign-key fields were sending empty strings instead of null when left blank. Fixed by explicitly coercing all optional UUID fields across expenses, income, invoices, and projects.",
      },
    ],
    outcomes: [
      "Live at hiruytech.com, publicly accessible worldwide via Cloudflare CDN.",
      "3 Next.js apps co-hosted on a single VPS with 4.7% disk usage and 16% RAM — efficient infrastructure management.",
      "Contact form submissions, waitlist signups, and quote requests flowing into the admin dashboard in production.",
      "SSL-secured, Cloudflare-proxied, auto-renewing certificates — zero manual maintenance required.",
    ],
    linkUrl: "https://hiruytech.com",
    linkLabel: "View live",
  },
  {
    slug: "doc-intelligence",
    initials: "DR",
    pattern: "waves",
    heroColor: "#5B4A6F",
    tag: "AI · RAG",
    heroTag: "AI · RAG pipeline · 10 Academy project",
    title: "Doc-Intelligence Refinery",
    summary:
      "An enterprise document-intelligence pipeline that classifies, extracts, and indexes fiscal data using forensic triage routing.",
    stack: ["Python", "LangGraph", "Gemini 1.5"],
    problem:
      "Regulatory and fiscal documents arrive unstructured and highly heterogeneous — different formats, layouts, and data density. Manually reviewing and extracting structured data from these corpora doesn't scale. This pipeline automates classification and extraction with enough precision to trust for fiscal reporting.",
    role: "Designed and built the pipeline architecture — the document classification/routing logic, the extraction strategy per document type, and the indexing layer — as an individual project during the 10 Academy TRP program (AI Agent Engineering track).",
    fullStack: [
      "Python",
      "Google Gemini 1.5 Flash",
      "LangGraph",
      "Multi-strategy routing",
      "Semantic chunking / RAG indexing",
      "Bounding-box provenance",
    ],
    approach:
      "A 'forensic triage routing' system — documents are first classified, then routed to the extraction strategy suited to their structure, rather than applying one generic extraction method to everything. This mirrors real enterprise document-intelligence needs, where a single pipeline has to handle wildly inconsistent input quality.",
    linkUrl: "https://github.com/yakobd/doc-intelligence-refinery",
    linkLabel: "View repo",
  },
  {
    slug: "automaton-auditor",
    initials: "AA",
    pattern: "triangles",
    heroColor: "#3E5C76",
    tag: "Multi-agent system",
    heroTag: "Multi-agent system · LangGraph · 10 Academy project",
    title: "Automaton Auditor",
    summary:
      "A multi-agent 'Digital Courtroom' running Detective, Prosecutor, Defense, and Judge agents for deterministic code review.",
    stack: ["Python", "LangGraph", "Pydantic"],
    problem:
      "Standard AI code review tends to be single-pass and shallow. This system structures code review as an adversarial, multi-perspective process — mirroring how real audits benefit from opposing viewpoints — to catch issues a single reviewer agent would miss, with a final arbitrating agent producing a deterministic verdict.",
    role: "Designed the multi-agent architecture and role division (Detective / Prosecutor / Defense / Judge), and implemented the orchestration using LangGraph as an individual project during the 10 Academy TRP program (AI Agent Engineering track).",
    fullStack: [
      "Python",
      "LangGraph",
      "Pydantic",
      "Hierarchical state graphs",
      "Parallel agent orchestration",
      "Conflict-resolution synthesis",
    ],
    approach:
      "Structured adversarial reasoning — rather than one model reviewing code once, opposing agent roles argue different interpretations of the same code, and a 'Chief Justice' agent synthesizes a final, deterministic verdict from the conflicting outputs.",
    linkUrl: "https://github.com/yakobd/automaton_auditor_project_tenx",
    linkLabel: "View repo",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
