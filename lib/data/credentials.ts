export type Credential = {
  title: string;
  issuer: string;
  /** Omitted when there is no date to show. */
  date?: string;
  description: string;
  /** Certificate image, shown in full on the page and enlargeable in a lightbox. */
  imageUrl?: string;
  /** Alt text for imageUrl. */
  imageAlt?: string;
  /** Optional second image for the same credential (e.g. program details). */
  imageUrl2?: string;
  /** Alt text for imageUrl2. */
  imageAlt2?: string;
};

// The first entry is shown as the full-width featured card.
export const credentials: Credential[] = [
  {
    title:
      "AI Agent Engineering, Evaluation & Forward Deployed Engineering (with Distinction)",
    issuer:
      "10 Academy & Tenacious Intelligence Corp · 720 hrs · Top 3% of applicants",
    date: "May 2026",
    description:
      "A 720-hour, 12-week full-time program in AI agent engineering, AI evaluation engineering and forward deployed engineering. Covered LangGraph and multi-agent systems, document intelligence and RAG, evaluation harness design, and fine-tuning with LoRA. Assessed through daily standups, presentations and 9 project assignments. Completed with Distinction, in the top 3% of applicants.",
    imageUrl: "/certificates/10academy-certificate.png",
    imageAlt: "10 Academy certificate of completion for Yakob Dereje",
    imageUrl2: "/certificates/10academy-program-details.png",
    imageAlt2:
      "10 Academy program details page listing the topics and assessments covered",
  },
  {
    title: "BSc, Software Engineering",
    issuer: "Jimma University",
    date: "June 2025",
    description:
      "Four-year Bachelor of Science in Software Engineering at Jimma University (2021 to 2025). Built a student registration system as a university project.",
    imageUrl: "/certificates/degree.jpg",
    imageAlt:
      "Jimma University letter confirming Yakob Dereje's BSc in Software Engineering",
  },
  {
    title: "Internship Certificate: Frontend Flutter Developer",
    issuer: "TechBridge",
    date: "November 2024",
    description:
      "Internship as a Frontend Flutter Developer. Worked in a team that built a complete pharmacy management system as a desktop application, working on the front end.",
    imageUrl: "/certificates/Internship_Techbridge.jpg",
    imageAlt:
      "TechBridge internship certificate for Yakob Dereje as a Frontend Flutter Developer",
  },
  {
    title: "Nanodegree: Artificial Intelligence Fundamentals",
    issuer: "Udacity",
    date: "December 2025",
    description:
      "Udacity Nanodegree covering the foundations of artificial intelligence.",
    imageUrl: "/certificates/Udacity_AI.jpg",
    imageAlt:
      "Udacity Nanodegree certificate in Artificial Intelligence Fundamentals for Yakob Dereje",
  },
  {
    title: "Nanodegree: Programming Fundamentals",
    issuer: "Udacity",
    date: "December 2025",
    description: "Udacity Nanodegree covering the foundations of programming.",
    imageUrl: "/certificates/Udacity_WEB.jpg",
    imageAlt:
      "Udacity Nanodegree certificate in Programming Fundamentals for Yakob Dereje",
  },
];
