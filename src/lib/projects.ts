import { getGitHubProjects } from './github';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl: string;
  status: 'completed' | 'in-progress' | 'archived';
  stars?: number;
  updatedAt?: string;
}

// Fallback projects in case GitHub API fails
const fallbackProjects: Project[] = [
  {
    id: '001',
    title: 'Retro-Futuristic Portfolio',
    description: 'Personal portfolio website with a unique retro-futuristic aesthetic, featuring interactive 3D elements, theme switching, multi-language support, and hidden games.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    githubUrl: 'https://github.com/Keninjavelas/retro-futuristic-portfolio',
    status: 'completed',
  },
];

// Cache for projects
let cachedProjects: Project[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

// Get all projects (from GitHub or cache)
export async function getProjects(): Promise<Project[]> {
  const now = Date.now();
  
  // Return cached projects if still valid
  if (cachedProjects && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedProjects;
  }

  try {
    // Fetch from GitHub
    const projects = await getGitHubProjects();
    
    if (projects.length > 0) {
      cachedProjects = projects;
      lastFetchTime = now;
      return projects;
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  // Return fallback if GitHub fetch fails
  return fallbackProjects;
}

// For static generation, we need a synchronous version
export const portfolioProjects: Project[] = fallbackProjects;

export function getProjectById(id: string): Project | undefined {
  return portfolioProjects.find((project) => project.id === id);
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return portfolioProjects.filter((project) => project.status === status);
}
