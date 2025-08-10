export type CTA = { text: string; href: string };

export type SocialLink = {
  platform: "LinkedIn" | "GitHub" | "Portfolio";
  url: string;
  icon: "linkedin" | "github" | "globe";
};

export type HeroData = {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  ctas: CTA[];
  social?: SocialLink[];
};

export type AboutAchievement = { metric: string; description: string };

export type Education = {
  degree: string;
  university: string;
  cgpa: string;
  duration: string;
  schooling?: {
    school: string;
    board: string;
    score: string;
  };
};

export type AboutData = {
  title: string;
  description: string;
  achievements: AboutAchievement[];
  education: Education;
};

export type SkillsCategory = {
  title: string;
  skills: string[];
};

export type SkillsData = {
  categories: SkillsCategory[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  achievements: string[];
};

export type ProjectItem = {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
};

export type ContactData = {
  title: string;
  description: string;
  email: string;
  phone: string;
  socialLinks: SocialLink[];
};
