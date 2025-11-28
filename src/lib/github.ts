export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  created_at: string;
}

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

const GITHUB_USERNAME = 'Keninjavelas';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Map of language to tech stack
const languageToTech: Record<string, string[]> = {
  'TypeScript': ['TypeScript', 'Node.js'],
  'JavaScript': ['JavaScript', 'Node.js'],
  'Python': ['Python'],
  'Java': ['Java'],
  'HTML': ['HTML', 'CSS', 'JavaScript'],
  'HCL': ['Terraform', 'AWS', 'Infrastructure as Code'],
  'Go': ['Go'],
  'Rust': ['Rust'],
  'C++': ['C++'],
  'C': ['C'],
};

// Fetch repositories from GitHub
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${GITHUB_API}?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

// Convert GitHub repo to Project format
export function convertRepoToProject(repo: GitHubRepo, index: number): Project {
  const technologies: string[] = [];
  
  // Add language-based technologies
  if (repo.language && languageToTech[repo.language]) {
    technologies.push(...languageToTech[repo.language]);
  }
  
  // Add topic-based technologies
  if (repo.topics && repo.topics.length > 0) {
    const topicTechs = repo.topics
      .map(topic => topic.charAt(0).toUpperCase() + topic.slice(1).replace(/-/g, ' '))
      .slice(0, 3);
    technologies.push(...topicTechs);
  }
  
  // Ensure we have at least the language
  if (technologies.length === 0 && repo.language) {
    technologies.push(repo.language);
  }

  // Determine status based on update date
  const updatedDate = new Date(repo.updated_at);
  const monthsOld = (Date.now() - updatedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  const status: Project['status'] = monthsOld < 3 ? 'in-progress' : 'completed';

  return {
    id: String(index + 1).padStart(3, '0'),
    title: repo.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    description: repo.description || `A ${repo.language || 'software'} project showcasing modern development practices and clean code architecture.`,
    technologies: [...new Set(technologies)].slice(0, 5), // Remove duplicates and limit to 5
    demoUrl: repo.homepage || undefined,
    githubUrl: repo.html_url,
    status,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
  };
}

// Get all projects from GitHub
export async function getGitHubProjects(): Promise<Project[]> {
  const repos = await fetchGitHubRepos();
  
  // Filter out forks and sort by stars and update date
  const filteredRepos = repos
    .filter(repo => !repo.name.includes('fork'))
    .sort((a, b) => {
      // Sort by stars first, then by update date
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  return filteredRepos.map((repo, index) => convertRepoToProject(repo, index));
}
