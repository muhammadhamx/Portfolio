'use client';

import { motion } from 'framer-motion';
import type { AppConfig } from './Desktop';

interface DesktopIconsProps {
  apps: AppConfig[];
  onOpen: (id: string) => void;
}

export default function DesktopIcons({ apps, onOpen }: DesktopIconsProps) {
  return (
    <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
      {apps.map((app, i) => (
        <motion.button
          key={app.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.8 + i * 0.1, duration: 0.3 }}
          onClick={() => onOpen(app.id)}
          className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.06] active:bg-white/10 active:scale-95 transition-all w-40 text-left"
          data-hover
        >
          <div
            className="w-10 h-10 rounded-lg bg-[#0d1117]/80 border flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold transition-all group-hover:scale-105 shrink-0"
            style={{
              color: app.iconColor,
              borderColor: `${app.iconColor}25`,
              boxShadow: `0 0 0px ${app.iconColor}00`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${app.iconColor}30`;
              (e.currentTarget as HTMLElement).style.borderColor = `${app.iconColor}50`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0px ${app.iconColor}00`;
              (e.currentTarget as HTMLElement).style.borderColor = `${app.iconColor}25`;
            }}
          >
            {app.iconText}
          </div>
          <span className="text-xs text-dim group-hover:text-text transition-colors truncate">
            {app.title}
          </span>
        </motion.button>
      ))}

      {/* CV download shortcut */}
      <motion.a
        href="/cv/Muhammad_Hamza_Sajid_CV.docx"
        download
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.8 + apps.length * 0.1, duration: 0.3 }}
        className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors w-40 text-left mt-4"
        data-hover
      >
        <div className="w-10 h-10 rounded-lg bg-[#0d1117]/80 border border-[#FFD70025] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-[#FFD700] transition-all group-hover:scale-105 shrink-0">
          CV
        </div>
        <span className="text-xs text-dim group-hover:text-text transition-colors truncate">
          resume.pdf
        </span>
      </motion.a>
    </div>
  );
}
