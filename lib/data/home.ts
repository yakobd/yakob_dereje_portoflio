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
  /** Shown in place of the initials once the file exists. */
  photo: "/images/profile.jpg",
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

// Entries whose quote is still this text are hidden on the site.
export const placeholderQuote = "[Client testimonial — add once available]";

// The first testimonial is shown as the large lead card on desktop.
const allTestimonials: Testimonial[] = [
  {
    quote:
      "Yakob did an excellent job delivering this project. He completed the AI-powered Telegram bot exactly as requested and within the agreed timeline. His communication was clear and professional, and he made sure to clarify all requirements before final submission. The code was well-structured, clean, and easy to understand, and the documentation he provided was very clear, making setup straightforward. The English and Amharic multilingual support was implemented perfectly, which was very important for our target users. Yakob showed strong Node.js and OpenAI API expertise, paid great attention to detail, and followed platform policies responsibly. He was responsive, proactive, and open to feedback. I would highly recommend Yakob to anyone looking for a reliable developer for Telegram bots, AI integrations, or Node.js projects, and I would be happy to work with him again.",
    name: "Verified Upwork Client",
    role: "AI Telegram Bot Project",
  },
  {
    quote:
      "Yakob did an excellent job delivering a fast and well-structured application. He was very professional, communicated clearly, and delivered everything on time. The code quality was clean, and he even suggested improvements that enhanced performance and usability. I really enjoyed working with him and would definitely hire him again for future projects. Highly recommended.",
    name: "Verified Upwork Client",
    role: "Upwork Project",
  },
  // Placeholder until the next testimonial is available.
  {
    quote: placeholderQuote,
    name: "[Client Name]",
    role: "[Role, Company]",
  },
];

export const testimonials = allTestimonials.filter(
  (testimonial) => testimonial.quote !== placeholderQuote,
);

export const contact = {
  heading: "Available for freelance and contract work.",
  details:
    "Rate: $35–55/hr (or fixed-price by project scope) · Available as needed · Based in Addis Ababa, Ethiopia (EAT)",
  email: "yakobdereje.yd@gmail.com",
  responseTime: "I usually reply within 24 hours.",
  phone: { display: "+251 961 008 600", href: "tel:+251961008600" },
  socials: [
    { label: "GitHub", href: "https://github.com/yakobd" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yakob-dereje-negash" },
    { label: "X / Twitter", href: "https://x.com/dereje_yak45629" },
    { label: "Substack", href: "https://yakobdereje.substack.com" },
  ] satisfies SocialLink[],
};
