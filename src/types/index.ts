export type SkillGroup = "frontend" | "backend" | "database" | "tools";

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  biography: string;
  photo: string;
  location?: string;
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  email?: string;
  featuredProjectSlugs: string[];
  achievements: string[];
  /** Brand accent used across this member's cards, headings and badges. */
  accent: string;
  /** One-line technical focus shown under the name. */
  specialty: string;
  /** Extended bio shown on the individual portfolio. */
  expandedBio: string;
  interests: string[];
  strengths: string[];
  approach: string;
  collaboration: string;
  skillGroups: Record<SkillGroup, string[]>;
}

export interface ProjectDetail {
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  contributions: Array<{ memberId: string; note: string }>;
  /** Optional gallery. Add real captures under public/images/projects/ to show them. */
  screenshots?: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  contributorIds: string[];
  categories: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  detail: ProjectDetail;
}

export type AchievementKind = "hackathon" | "certification" | "milestone" | "open-source" | "award";

export interface Achievement {
  id: string;
  title: string;
  summary: string;
  kind: AchievementKind;
  date: string;
  memberId?: string;
  accent: string;
}

export type TechnologyCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Testing"
  | "Design"
  | "Collaboration";

export interface Technology {
  name: string;
  category: TechnologyCategory;
  description: string;
  memberIds: string[];
}

export interface NavItem {
  label: string;
  to: string;
  accent: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType?: string;
  toMemberSlug?: string;
}
