'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { stats } from '@/lib/data';

const paragraphs = [
  'Lead Software Engineer with 4+ years of experience architecting and shipping 9 production systems across healthcare, insurtech, fintech, and real-time communication.',
  'Promoted from Senior to Lead Engineer based on consistent delivery ownership and technical leadership.',
  'Fluent across the full stack — Node.js/Django/FastAPI backends, React/Angular/Next.js frontends, PostgreSQL/MongoDB/Redis data layers, AI integration pipelines, and AWS/Docker infrastructure.',
];

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

function StatCard({ label, target, suffix }: { label: string; target: number; suffix: string }) {
  const { count, ref } = useCountUp(target);

  return (
    <div ref={ref} className="glass-card flex flex-col items-center justify-center p-6">
      <span className="text-cyan font-[family-name:var(--font-space-grotesk)] text-5xl font-bold">
        {count}
        {suffix}
      </span>
      <span className="text-dim mt-2 text-sm">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gradient font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-center mb-16"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Paragraphs */}
          <div className="flex flex-col gap-6">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
                className="text-dim text-lg leading-relaxed"
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                target={stat.target}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
