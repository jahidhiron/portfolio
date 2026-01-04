// types.ts

export interface ExperienceItem {
  title: string;
  company: string;
  type: string;
  duration: string;
  description?: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  major: string;
  duration: string;
}

export interface SidebarPerson {
  name: string;
  title: string;
}

export interface SuggestedPage {
  name: string;
  type: string;
}

export interface SidebarData {
  profileUrl: string;
  viewedPeople: SidebarPerson[];
  suggestedPages: SuggestedPage[];
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  connections: string;
  summary: string;
  experiences: ExperienceItem[];
  educationList: EducationItem[];
  skills: string[];
  sidebar: SidebarData;
}

export interface ContactMethod {
  type: string;
  title: string;
  icon: string;
  subtitle: string;
  link: string | null;
  secondaryLink?: string | null;
  iconClass: string;
}
