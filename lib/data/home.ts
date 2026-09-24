export type Stat = { value: string; label: string };
export type ProcessStep = { number: string; title: string; description: string };
export type Testimonial = { quote: string; name: string; role: string };
export type SocialLink = { label: string; href: string };

export const hero = {
  availability: "Available for freelance & contract work",
  eyebrow: "AI-Focused Software Engineer",
  heading: "I build production systems where AI does real work — not demos.",
  subhead:
    "Co-Founder & CEO of Hiruy Technologies. I design and ship full-stack platforms, multi-agent systems, and RAG pipelines end to end — architecture, infrastructure, and the code itself.",
  stats: [
    { value: "15+", label: "Shipped projects" },
    { value: "5", label: "Production sites self-hosted" },
    { value: "With Distinction", label: "10 Academy AI Agent Engineering" },
  ] satisfies Stat[],
};

export const about = {
  initials: "YD",
  heading: "Technical founder, still writing the code.",
  paragraphs: [
    "I'm a software engineer based in Addis Ababa, Ethiopia, and the Co-Founder & CEO of Hiruy Technologies, an AI-powered software development and tech education company. I hold a BSc in Software Engineering from Jimma University and completed 10 Academy's intensive AI Agent Engineering, Evaluation, and Forward Deployed Engineering program with Distinction — top 3% of applicants.",
    "Unlike most CEOs, I'm still the primary engineer on every product I ship — from multi-tenant platforms serving real weddings to multi-agent AI systems. I own the full stack: architecture, database design, infrastructure, and production debugging.",
    "I got into software because I liked watching ideas turn into things people actually use — and AI changed how fast that gap could close. Co-founding Hiruy Technologies let me build that way from day one: own the whole system, ship it, watch real people use it, then go fix what breaks. That's still what I enjoy most about the work.",
  ],
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Scope the real problem, requirements, and constraints with you before writing any code.",
  },
  {
    number: "02",
    title: "Architect",
    description:
      "Design the data model, system architecture, and tech choices that actually fit the requirements.",
  },
  {
    number: "03",
    title: "Build & Ship",
    description:
      "Implement, test against real usage, and deploy to production — not just a staging demo.",
  },
  {
    number: "04",
    title: "Support",
    description:
      "Fix what breaks in production and iterate as your needs change.",
  },
];

// Placeholders until real testimonials are available.
export const testimonials: Testimonial[] = Array.from({ length: 3 }, () => ({
  quote: "[Client testimonial — add once available]",
  name: "[Client Name]",
  role: "[Role, Company]",
}));

export const contact = {
  heading: "Available for freelance and contract work.",
  details:
    "Rate: $35–55/hr (or fixed-price by project scope) · Available as needed · Based in Addis Ababa, Ethiopia (EAT)",
  email: "yakobdereje.yd@gmail.com",
  phone: { display: "+251 961 008 600", href: "tel:+251961008600" },
  socials: [
    { label: "GitHub", href: "https://github.com/yakobd" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yakob-dereje-negash" },
    { label: "X / Twitter", href: "https://x.com/dereje_yak45629" },
    { label: "Substack", href: "https://yakobdereje.substack.com" },
  ] satisfies SocialLink[],
};
