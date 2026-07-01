export interface Project {
  name: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
}


export const PROJECTS: Project[] = [
  {
    name: "proyecto-1",
    description:
      "Placeholder",
    tech: ["React", "TypeScript"],
    repoUrl: "https://github.com/giovanniclmb",
  },
  {
    name: "proyecto-2",
    description:
      "Placeholder",
    tech: ["Java", "MySQL"],
    repoUrl: "https://github.com/giovanniclmb",
    liveUrl: "https://example.com",
  },
  {
    name: "proyecto-3",
    description:
      "Placeholder",
    tech: ["JavaScript"],
  },
];
