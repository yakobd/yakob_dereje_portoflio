export type Credential = {
  title: string;
  issuer: string;
  /** Omitted when there is no date to show. */
  date?: string;
  /** Certificate image, shown as a thumbnail that opens a lightbox. */
  imageUrl?: string;
  /** Optional second image for the same credential (e.g. program details). */
  imageUrl2?: string;
};

export const credentials: Credential[] = [
  {
    title:
      "AI Agent Engineering, Evaluation & Forward Deployed Engineering — with Distinction",
    issuer:
      "10 Academy & Tenacious Intelligence Corp · 720 hrs · Top 3% of applicants",
    date: "May 2026",
    imageUrl: "/certificates/10academy-certificate.png",
    imageUrl2: "/certificates/10academy-program-details.png",
  },
  {
    title: "BSc, Software Engineering",
    issuer: "Jimma University",
    date: "June 2025",
    imageUrl: "/certificates/degree.jpg",
  },
  {
    title: "Internship Certificate — Frontend Flutter Developer",
    issuer: "TechBridge",
    date: "November 2024",
    imageUrl: "/certificates/Internship_Techbridge.jpg",
  },
  {
    title: "Nanodegree — Artificial Intelligence Fundamentals",
    issuer: "Udacity",
    date: "December 2025",
    imageUrl: "/certificates/Udacity_AI.jpg",
  },
  {
    title: "Nanodegree — Programming Fundamentals",
    issuer: "Udacity",
    date: "December 2025",
    imageUrl: "/certificates/Udacity_WEB.jpg",
  },
];
