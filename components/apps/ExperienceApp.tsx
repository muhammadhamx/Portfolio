'use client';

import { experiences } from '@/lib/data';

export default function ExperienceApp() {
  return (
    <div className="p-6 space-y-6">
      {experiences.map((exp, i) => (
        <div key={i} className="glass-card p-5 relative overflow-hidden">
          {/* Header */}
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-text">
            {exp.role}
          </h3>
          <p className="text-dim text-sm mt-1">{exp.company}</p>
          <p className="text-dim/60 text-xs mt-0.5 font-[family-name:var(--font-jetbrains-mono)]">
            {exp.period} &middot; {exp.location}
          </p>

          {/* Bullets */}
          <ul className="mt-4 space-y-2">
            {exp.bullets.map((bullet, j) => (
              <li key={j} className="flex gap-2 text-xs text-dim leading-relaxed">
                <span className="text-cyan mt-0.5 shrink-0">&rsaquo;</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Decorative line */}
          <div
            className="absolute left-0 top-0 w-[2px] h-full"
            style={{ background: i === 0 ? '#00D4FF' : '#7B2FFF' }}
          />
        </div>
      ))}
    </div>
  );
}
