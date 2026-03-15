'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WelcomeWidgetProps {
  onOpen: (id: string) => void;
}

const QUICK_ACTIONS = [
  { id: 'about', label: 'Who am I?', icon: 'SYS', color: '#00D4FF' },
  { id: 'projects', label: 'See my work', icon: 'DEV', color: '#00FF88' },
  { id: 'terminal', label: 'Open terminal', icon: '>_', color: '#00D4FF' },
  { id: 'contact', label: 'Get in touch', icon: '.SH', color: '#FF69B4' },
];

function Clock() {
  const [time, setTime] = useState({ hours: '', minutes: '', date: '' });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime({
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        date: now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }),
      });
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-6">
      <div className="font-[family-name:var(--font-space-grotesk)] text-7xl font-bold text-text/90 tracking-tight">
        {time.hours}
        <span className="text-cyan animate-blink">:</span>
        {time.minutes}
      </div>
      <div className="text-dim text-sm mt-1 font-[family-name:var(--font-inter)]">{time.date}</div>
    </div>
  );
}

export default function WelcomeWidget({ onOpen }: WelcomeWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4.2, duration: 0.6 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-auto"
      style={{ marginLeft: '60px' }}
    >
      <div className="flex flex-col items-center">
        {/* Clock */}
        <Clock />

        {/* Identity */}
        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-text tracking-tight">
            Muhammad Hamza Sajid
          </h1>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-cyan text-xs mt-1 tracking-wider">
            Lead Software Engineer
          </p>
          <div className="flex items-center gap-2 justify-center mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <span className="text-green text-[10px] font-[family-name:var(--font-jetbrains-mono)]">
              Available for hire
            </span>
          </div>
        </div>

        {/* Quick launch */}
        <div className="grid grid-cols-2 gap-2.5 w-[320px]">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.5 + i * 0.08 }}
              onClick={() => onOpen(action.id)}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] active:scale-95 transition-all text-left"
              data-hover
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[9px] font-bold shrink-0 transition-all"
                style={{
                  color: action.color,
                  background: `${action.color}10`,
                  border: `1px solid ${action.color}20`,
                }}
              >
                {action.icon}
              </div>
              <span className="text-xs text-dim group-hover:text-text transition-colors">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Hint */}
        <p className="text-white/[0.15] text-[10px] mt-6 font-[family-name:var(--font-jetbrains-mono)]">
          click icons on the left or use the quick actions above
        </p>
      </div>
    </motion.div>
  );
}
