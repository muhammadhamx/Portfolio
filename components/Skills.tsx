'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-4">
      <motion.h2
        className="text-gradient font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Skills &amp; Expertise
      </motion.h2>

      <div className="max-w-5xl mx-auto space-y-10">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: catIndex * 0.1,
            }}
          >
            {/* Category header */}
            <h3
              className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-4"
              style={{
                color: category.color,
                textShadow: `0 0 20px ${category.color}33`,
              }}
            >
              {category.name}
            </h3>

            {/* Skill chips */}
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 18,
                    delay: catIndex * 0.1 + skillIndex * 0.05,
                  }}
                  className="group relative bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-text cursor-default transition-all duration-300 hover:scale-105"
                  style={
                    {
                      '--chip-color': category.color,
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = category.color;
                    el.style.boxShadow = `0 0 12px ${category.color}33, 0 0 24px ${category.color}1a`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(255,255,255,0.1)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Decorative gradient line between categories */}
            {catIndex < skillCategories.length - 1 && (
              <div
                className="mt-10 h-px w-full opacity-20"
                style={{
                  background: `linear-gradient(to right, transparent, ${category.color}66, ${skillCategories[catIndex + 1].color}66, transparent)`,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
