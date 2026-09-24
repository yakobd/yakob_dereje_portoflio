export type Credential = {
  title: string;
  issuer: string;
  /** Omitted when there is no date to show. */
  date?: string;
};

export const credentials: Credential[] = [
  {
    title:
      "AI Agent Engineering, Evaluation & Forward Deployed Engineering — with Distinction",
    issuer:
      "10 Academy & Tenacious Intelligence Corp · 720 hrs · Top 3% of applicants",
    date: "May 2026",
  },
  {
    title: "BSc, Software Engineering",
    issuer: "Jimma University",
    date: "June 2025",
  },
  {
    title: "Internship Certificate — Frontend Flutter Developer",
    issuer: "TechBridge",
  },
  {
    title: "Nanodegree — Artificial Intelligence Fundamentals",
    issuer: "Udacity",
  },
  {
    title: "Nanodegree — Programming Fundamentals",
    issuer: "Udacity",
  },
];
