'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lineEl = timelineLineRef.current;
    const sectionEl = sectionRef.current;
    if (!lineEl || !sectionEl) return;

    gsap.set(lineEl, { scaleY: 0, transformOrigin: 'top center' });

    const trigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 0.5,
      animation: gsap.to(lineEl, { scaleY: 1, ease: 'none' }),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gradient font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-center mb-20"
        >
          Experience
        </motion.h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Center line */}
          <div
            ref={timelineLineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, #00D4FF, #7B2FFF)',
            }}
          />

          <div className="flex flex-col gap-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 md:left-1/2 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan"
                    style={{
                      boxShadow: '0 0 12px rgba(0, 212, 255, 0.6), 0 0 30px rgba(0, 212, 255, 0.3)',
                    }}
                  />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isLeft ? -50 : 50,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isLeft ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="glass-card p-6">
                      {/* Promoted badge */}
                      {exp.promoted && (
                        <span className="inline-block mb-3 animate-glow rounded-full bg-cyan/20 px-3 py-1 text-xs font-bold text-cyan">
                          PROMOTED TO LEAD
                        </span>
                      )}

                      {/* Role */}
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
                        {exp.role}
                      </h3>

                      {/* Promoted from */}
                      {exp.promotedFrom && (
                        <p className="text-cyan text-sm mt-1">
                          &uarr; Promoted from {exp.promotedFrom}
                        </p>
                      )}

                      {/* Company */}
                      <p className="text-dim mt-1">{exp.company}</p>

                      {/* Period + Location */}
                      <p className="text-dim text-sm mt-1">
                        {exp.period} &middot; {exp.location}
                      </p>

                      {/* Bullets */}
                      <ul className="mt-4 flex flex-col gap-3">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="border-l-2 border-cyan pl-3 text-sm text-dim/80"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
