'use client';

import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/data';

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current || started.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const duration = 1500;
          const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="glass-card p-5 text-center">
      <div className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-cyan">
        {count}{suffix}
      </div>
      <div className="text-dim text-xs mt-1.5">{label}</div>
    </div>
  );
}

export default function AboutApp() {
  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold shrink-0">
          MHS
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-text">
            Muhammad Hamza Sajid
          </h2>
          <p className="text-cyan text-sm">Lead Software Engineer</p>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-3 text-dim text-sm leading-relaxed">
        <p>
          Lead Software Engineer with 4+ years of experience architecting and shipping 9 production
          systems across healthcare, insurtech, fintech, and real-time communication.
        </p>
        <p>
          Promoted from Senior to Lead Engineer based on consistent delivery ownership and technical
          leadership.
        </p>
        <p>
          Fluent across the full stack &mdash; Node.js/Django/FastAPI backends, React/Angular/Next.js
          frontends, PostgreSQL/MongoDB/Redis data layers, AI integration pipelines, and AWS/Docker
          infrastructure.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(s => (
          <StatCounter key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
        ))}
      </div>

      {/* Status */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
          <span className="text-green text-xs font-[family-name:var(--font-jetbrains-mono)]">AVAILABLE</span>
        </div>
        <p className="text-dim text-xs">
          Open to Lead Engineer roles in Islamabad / Rawalpindi and remote opportunities.
        </p>
      </div>
    </div>
  );
}
