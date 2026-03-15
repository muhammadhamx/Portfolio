'use client';

import { skillCategories } from '@/lib/data';

export default function SkillsApp() {
  return (
    <div className="p-6 space-y-5">
      {skillCategories.map(category => (
        <div key={category.name}>
          <h3
            className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold mb-2.5"
            style={{
              color: category.color,
              textShadow: `0 0 15px ${category.color}30`,
            }}
          >
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map(skill => (
              <span
                key={skill}
                className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-text transition-all duration-200 cursor-default hover:scale-105"
                style={{
                  ['--hover-color' as string]: category.color,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${category.color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${category.color}20`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
