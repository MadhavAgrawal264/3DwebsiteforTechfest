export interface Booth {
  id: string;
  name: string;
  codename: string;
  category: string;
  tagline: string;
  description: string;
  position3D: [number, number, number];
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
  themeColor: string;
  modelType: 'robowars' | 'quantum_ai' | 'aerospace' | 'cybersec' | 'portfolio';
  prizePool: string;
  dates: string;
  venue: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  featuredEvents: {
    title: string;
    description: string;
    category: string;
    teamsRegistered: number;
    prize: string;
  }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  period: string;
  description: string;
  impact: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface DeveloperProfile {
  name: string;
  title: string;
  role: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioWebsite: string;
  skills: {
    category: string;
    items: string[];
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  projects: PortfolioProject[];
}
