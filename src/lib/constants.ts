import { type HeroData, type AboutData, type SkillsData, type ExperienceItem, type ProjectItem, type ContactData } from "./types";

export const NAV_ITEMS = ["About", "Skills", "Experience", "Projects", "Contact"] as const;

export const heroData: HeroData = {
  name: "Harsh Karan",
  title: "Full-Stack Developer",
  subtitle: "Product-focused engineer | Open to SDE roles",
  description:
    "Full‑stack developer with experience across modern TypeScript, Next.js, Node.js, and AWS. Currently contributing to production systems; interested in full‑time roles where I can own features end‑to‑end and collaborate closely with product and design.",
  location: "Jamshedpur, Jharkhand, India",
  ctas: [
    { text: "View Experience", href: "#experience" },
    { text: "Contact Me", href: "#contact" },
  ],
  social: [
    { platform: "LinkedIn", url: "#", icon: "linkedin" },
    { platform: "GitHub", url: "#", icon: "github" },
    { platform: "Portfolio", url: "#", icon: "globe" },
  ],
};

export const aboutData: AboutData = {
  title: "About Me",
  description:
    "I’m a Full‑Stack Developer who ships reliable, maintainable software. My focus is clear ownership, well‑tested code, and thoughtful DX. Day‑to‑day I build with Next.js, Node.js, and AWS, working closely with cross‑functional teams to deliver measurable product outcomes.",
  achievements: [
    { metric: "25%", description: "Improved data processing throughput" },
    { metric: "40%", description: "Reduced manual error rates" },
    { metric: "15+", description: "Hours of weekly manual work eliminated" },
    { metric: "96%", description: "ML model accuracy achieved" },
  ],
  education: {
    degree: "B.Tech Computer Science & Engineering",
    university: "KIIT University",
    cgpa: "9.16/10.0",
    duration: "2020 - 2024",
    schooling: {
      school: "Loyola School, Jamshedpur",
      board: "ISC",
      score: "88%",
    },
  },
};

export const skillsData: SkillsData = {
  categories: [
    { title: "Languages", skills: ["JavaScript", "TypeScript", "Python", "Java"] },
    { title: "Frontend", skills: ["Next.js", "React.js", "TailwindCSS", "HTML/CSS"] },
    { title: "Backend", skills: ["Node.js", "Express.js", "RESTful APIs"] },
    { title: "Databases", skills: ["PostgreSQL", "MongoDB", "Redis"] },
    { title: "Cloud & DevOps", skills: ["AWS", "Docker", "CI/CD Pipelines", "Git"] },
    { title: "Tools", skills: ["Prisma", "n8n", "Postman", "Jest"] },
  ],
};

export const experienceData: ExperienceItem[] = [
  {
    role: "Software Development Engineer",
    company: "Ambill",
    duration: "August 2024 – Present",
    location: "Jamshedpur, India",
    type: "Full-Stack Developer - Finance Automation SaaS",
    achievements: [
      "Architected and led the end-to-end development of a core financial automation module, improving data processing throughput by 25% and reducing system latency.",
      "Seamlessly integrated with 5+ external client ERP systems via RESTful APIs, automating critical data reconciliation workflows and reducing manual error rates by 40%.",
      "Designed and deployed autonomous AI agents using n8n for workflow automation, eliminating 15+ hours of manual data entry per week.",
    ],
  },
  {
    role: "Frontend Intern",
    company: "Ambill",
    duration: "May 2024 – August 2024",
    location: "Jamshedpur, India",
    type: "Web Development Intern",
    achievements: [
      "Rapidly ramped up from frontend tasks to full-stack ownership within 8 weeks, earning a full-time offer after delivering a critical user settings interface ahead of schedule.",
      "Owned the development and launch of 3 key features, including a secure password reset flow and a granular role-based access control (RBAC) module.",
    ],
  },
  {
    role: "Summer Intern",
    company: "Tata Steel",
    duration: "June 2023 – July 2023",
    location: "Jamshedpur, India",
    type: "Computer Vision & ML Intern",
    achievements: [
      "Developed a high-fidelity proof-of-concept driver drowsiness detection system using Python, OpenCV, and dlib, achieving 96% detection accuracy.",
      "Engineered and optimized the core logic for real-time fatigue detection by implementing facial landmark recognition and Eye Aspect Ratio (EAR) algorithms.",
    ],
  },
];

export const projectsData: ProjectItem[] = [
  {
    title: "Insight API - Serverless E-commerce Analytics",
    description:
      "Built a cost-effective, highly available serverless RESTful API using AWS Lambda and API Gateway to ingest, process, and serve e-commerce analytics data.",
    technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "Python"],
    features: [
      "Single-table DynamoDB schema optimized for application query patterns",
      "Consistent sub-50ms read/write latency",
      "Serverless architecture for cost optimization",
    ],
    githubUrl: "#",
    liveUrl: "#",
    image: "/projects/insight-api.svg",
  },
  {
    title: "InkSync - Real-Time Collaborative Whiteboard",
    description:
      "Engineered a real-time collaborative web application using WebSockets (Socket.IO), enabling multiple users to co-create on a shared canvas with minimal latency.",
    technologies: ["Next.js", "Node.js", "Socket.IO", "Docker"],
    features: [
      "Real-time collaboration with WebSockets",
      "Dockerized full-stack application",
      "Minimal latency multi-user experience",
    ],
    githubUrl: "#",
    liveUrl: "#",
    image: "/projects/inksync.svg",
  },
  {
    title: "Secure Full-Stack Authentication System",
    description:
      "Developed a secure, production-ready authentication system implementing stateless JWTs for session management and robust password hashing with bcrypt.",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
    features: [
      "Stateless JWT session management",
      "Modular backend architecture",
      "Type-safe database operations with Prisma",
    ],
    githubUrl: "#",
    liveUrl: "#",
    image: "/projects/auth-system.svg",
  },
];

export const contactData: ContactData = {
  title: "Get In Touch",
  description:
    "Let's discuss how we can work together to bring your next project to life.",
  email: "karanharshe577@gmail.com",
  phone: "+91-8235027750",
  socialLinks: [
    { platform: "LinkedIn", url: "#", icon: "linkedin" },
    { platform: "GitHub", url: "#", icon: "github" },
    { platform: "Portfolio", url: "#", icon: "globe" },
  ],
};
