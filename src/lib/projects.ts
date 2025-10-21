export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'archived';
}

export const portfolioProjects: Project[] = [
  {
    id: '001',
    title: 'Quantum Data Analyzer',
    description: 'Advanced data processing system with real-time quantum encryption protocols. Processes terabytes of classified information per second.',
    technologies: ['React', 'TypeScript', 'WebGL', 'Node.js'],
    status: 'completed',
  },
  {
    id: '002',
    title: 'Neural Network Dashboard',
    description: 'AI-powered monitoring interface for distributed systems. Features predictive analytics and autonomous threat detection.',
    technologies: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL'],
    status: 'completed',
  },
  {
    id: '003',
    title: 'Holographic UI Framework',
    description: 'Immersive 3D user interface library with gesture recognition. Enables spatial computing experiences in the browser.',
    technologies: ['Three.js', 'WebXR', 'TypeScript', 'GLSL'],
    status: 'in-progress',
  },
  {
    id: '004',
    title: 'Distributed Ledger System',
    description: 'Blockchain-based secure transaction platform with zero-knowledge proofs. Handles millions of transactions with quantum-resistant encryption.',
    technologies: ['Rust', 'Solidity', 'React', 'IPFS'],
    status: 'completed',
  },
  {
    id: '005',
    title: 'Biometric Authentication API',
    description: 'Multi-factor authentication system using advanced biometric sensors. Supports retinal, voice, and behavioral pattern recognition.',
    technologies: ['Go', 'gRPC', 'Redis', 'Docker'],
    status: 'archived',
  },
  {
    id: '006',
    title: 'Augmented Reality Engine',
    description: 'Real-time AR overlay system for industrial applications. Integrates with IoT sensors for environmental mapping.',
    technologies: ['Unity', 'C#', 'ARCore', 'Firebase'],
    status: 'in-progress',
  },
];

export function getProjectById(id: string): Project | undefined {
  return portfolioProjects.find((project) => project.id === id);
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return portfolioProjects.filter((project) => project.status === status);
}
