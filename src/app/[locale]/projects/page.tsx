'use client';

import { type Locale } from '@/i18n/config';
import { useClientTranslation } from '@/i18n/client';
import GlitchText from '@/components/GlitchText';
import { getProjects, type Project } from '@/lib/projects';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useClientTranslation(locale);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadProjects() {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const toggleStatus = (projectId: string) => {
    setStatusOverrides(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const getDisplayStatus = (project: Project) => {
    if (project.status === 'in-progress') {
      return statusOverrides[project.id] ? 'in-progress' : 'completed';
    }
    return project.status;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      {/* Header Section */}
      <section className="text-center py-8 mb-8">
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl text-sepia font-mono tracking-[0.3em] uppercase mb-6">
            [ PROJECT SHOWCASE ]
          </h1>
          <GlitchText className="text-4xl md:text-6xl text-neon-pink mb-4">
            MISSION ARCHIVES
          </GlitchText>
          <h2 className="text-lg md:text-xl text-text-secondary font-mono mb-6">
            COMPLETED OPERATIONS & ACTIVE DEVELOPMENT
          </h2>
          <p className="max-w-3xl mx-auto text-text-secondary text-lg leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-20">
          <div className="text-neon-cyan font-mono text-xl animate-pulse">
            LOADING PROJECTS FROM GITHUB...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
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
              <button
                onClick={() => project.status === 'in-progress' && toggleStatus(project.id)}
                className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                  getDisplayStatus(project) === 'completed'
                    ? 'bg-bg-dark text-neon-green border border-neon-green'
                    : getDisplayStatus(project) === 'in-progress'
                    ? 'bg-bg-dark text-neon-gold border border-neon-gold'
                    : 'bg-bg-dark text-text-muted border border-text-muted'
                } ${project.status === 'in-progress' ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                title={project.status === 'in-progress' ? 'Click to toggle status' : ''}
              >
                {getDisplayStatus(project).toUpperCase()}
              </button>
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
                  className="px-2 py-1 bg-bg-dark text-neon-cyan text-xs rounded border border-neon-cyan border-opacity-50 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 border border-neon-cyan text-neon-cyan font-mono text-sm hover:bg-neon-cyan hover:text-bg-dark transition-all rounded text-center"
                >
                  LIVE DEMO →
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 border border-neon-gold text-neon-gold font-mono text-sm hover:bg-neon-gold hover:text-bg-dark transition-all rounded text-center"
              >
                VIEW CODE →
              </a>
            </div>
            {project.stars !== undefined && project.stars > 0 && (
              <div className="mt-2 text-xs text-text-muted font-mono">
                ⭐ {project.stars} stars
              </div>
            )}
          </div>
        ))}
      </div>
      )}

      {/* CTA Section */}
      <section className="mt-12 py-10 text-center border-t border-neon-pink border-opacity-30">
        <h3 className="text-2xl md:text-3xl text-neon-cyan font-mono mb-4">
          [ INTERESTED IN COLLABORATION? ]
        </h3>
        <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
          Have a project in mind? Let&apos;s discuss how we can bring your vision to life with innovative 
          solutions and cutting-edge technology.
        </p>
        <a
          href={`/${locale}/contact`}
          className="inline-block px-8 py-4 border-2 border-neon-cyan bg-transparent hover:bg-neon-cyan hover:bg-opacity-10 transition-all duration-300 rounded-lg"
        >
          <span className="text-neon-cyan font-mono text-lg tracking-wider hover:text-glow">
            ▸ START A PROJECT
          </span>
        </a>
      </section>
    </div>
  );
}
