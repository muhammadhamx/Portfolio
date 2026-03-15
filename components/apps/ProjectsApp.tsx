'use client';

import { useRef } from 'react';
import { projects } from '@/lib/data';

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className="glass-card p-4 relative overflow-hidden transition-all duration-300 group"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {project.featured && (
        <span className="absolute top-3 right-3 bg-cyan/15 text-cyan text-[9px] font-bold px-2 py-0.5 rounded-full font-[family-name:var(--font-jetbrains-mono)]">
          FEATURED
        </span>
      )}

      <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-text">
        {project.title}
      </h3>
      <p className="text-cyan text-xs mt-0.5">{project.subtitle}</p>
      <p className="text-dim text-xs mt-2 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {project.stack.map(tech => (
          <span
            key={tech}
            className="text-[10px] bg-white/5 border border-white/10 rounded-full px-2 py-0.5 text-dim font-[family-name:var(--font-jetbrains-mono)]"
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.githubUrl) && (
        <div className="flex gap-3 mt-3 pt-3 border-t border-white/[0.06]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan text-xs hover:underline"
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim text-xs hover:text-text transition"
            >
              GitHub ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectsApp() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
