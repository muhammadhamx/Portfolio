'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-4">
      <motion.h2
        className="text-gradient font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((mouseY - centerY) / centerY) * -12;
    const rotateY = ((mouseX - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    if (shine) {
      shine.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1) 0%, transparent 60%)`;
      shine.style.opacity = '1';
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.1s ease-out';
    card.style.borderColor = 'rgba(0, 212, 255, 0.4)';
    card.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.15), 0 0 40px rgba(0, 212, 255, 0.05)';
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;

    card.style.transition = 'transform 0.4s ease-out, border-color 0.4s ease-out, box-shadow 0.4s ease-out';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.borderColor = '';
    card.style.boxShadow = '';

    if (shine) {
      shine.style.opacity = '0';
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
    >
      <div
        ref={cardRef}
        className="glass-card relative overflow-hidden p-6 h-full flex flex-col"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: 'transform' }}
      >
        {/* Shine overlay */}
        <div
          ref={shineRef}
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-4 right-4 bg-cyan/20 text-cyan text-xs font-bold px-3 py-1 rounded-full z-20">
            FEATURED
          </span>
        )}

        {/* Gradient overlay */}
        <div
          className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${project.gradient} opacity-30 pointer-events-none`}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1">
          <p className="text-cyan text-sm font-medium">{project.subtitle}</p>
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-text mt-2">
            {project.title}
          </h3>
          <p className="text-dim text-sm mt-3 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-dim font-[family-name:var(--font-jetbrains-mono)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-4 pt-2 mt-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan text-sm hover:underline"
              >
                Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim text-sm hover:text-cyan transition-colors"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
