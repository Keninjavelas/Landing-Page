import { type Locale } from '@/i18n/config';
import GlitchText from '@/components/GlitchText';
import { portfolioProjects } from '@/lib/projects';

interface ProjectsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  await params;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <GlitchText className="text-4xl md:text-6xl text-neon-pink mb-4">
          MISSION ARCHIVES
        </GlitchText>
        <h2 className="text-lg md:text-xl text-sepia font-mono">
          COMPLETED OPERATIONS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioProjects.map((project) => (
          <div
            key={project.id}
            className="border border-neon-pink p-6 rounded bg-bg-darker bg-opacity-50 hover:bg-opacity-80 transition-all group"
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-neon-pink mb-1 group-hover:text-glow transition-all">
                  {project.title}
                </h3>
                <div className="text-xs font-mono text-text-muted">ID: {project.id}</div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-mono rounded ${
                  project.status === 'completed'
                    ? 'bg-neon-green bg-opacity-20 text-neon-green border border-neon-green'
                    : project.status === 'in-progress'
                    ? 'bg-neon-gold bg-opacity-20 text-neon-gold border border-neon-gold'
                    : 'bg-text-muted bg-opacity-20 text-text-muted border border-text-muted'
                }`}
              >
                {project.status.toUpperCase()}
              </span>
            </div>

            {/* Description */}
            <p className="text-text-secondary mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-neon-cyan bg-opacity-10 text-neon-cyan text-xs rounded border border-neon-cyan border-opacity-30 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Button */}
            <button className="w-full py-2 border border-neon-pink text-neon-pink font-mono text-sm hover:bg-neon-pink hover:text-bg-dark transition-all rounded">
              ACCESS FILES →
            </button>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-12 grid grid-cols-3 gap-4">
        <div className="text-center p-4 border border-neon-green rounded bg-bg-darker bg-opacity-30">
          <div className="text-2xl font-bold text-neon-green mb-1">
            {portfolioProjects.filter((p) => p.status === 'completed').length}
          </div>
          <div className="text-xs text-text-secondary font-mono">COMPLETED</div>
        </div>
        <div className="text-center p-4 border border-neon-gold rounded bg-bg-darker bg-opacity-30">
          <div className="text-2xl font-bold text-neon-gold mb-1">
            {portfolioProjects.filter((p) => p.status === 'in-progress').length}
          </div>
          <div className="text-xs text-text-secondary font-mono">IN PROGRESS</div>
        </div>
        <div className="text-center p-4 border border-text-muted rounded bg-bg-darker bg-opacity-30">
          <div className="text-2xl font-bold text-text-muted mb-1">
            {portfolioProjects.filter((p) => p.status === 'archived').length}
          </div>
          <div className="text-xs text-text-secondary font-mono">ARCHIVED</div>
        </div>
      </div>
    </div>
  );
}
