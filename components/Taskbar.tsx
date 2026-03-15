'use client';

import { useState, useEffect } from 'react';

interface TaskbarWindow {
  id: string;
  title: string;
  isMinimized: boolean;
}

interface TaskbarProps {
  windows: TaskbarWindow[];
  onClickWindow: (id: string) => void;
}

export default function Taskbar({ windows, onClickWindow }: TaskbarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-11 bg-[#0d1117]/85 backdrop-blur-xl border-t border-white/[0.06] z-50 flex items-center px-4 gap-3">
      {/* Logo */}
      <span className="font-[family-name:var(--font-jetbrains-mono)] text-cyan text-xs shrink-0">
        <span className="text-dim">&lt;</span>Hamza<span className="text-dim"> /&gt;</span>
      </span>

      <div className="w-px h-5 bg-white/10 shrink-0" />

      {/* Open windows */}
      <div className="flex gap-1.5 flex-1 overflow-x-auto">
        {windows.map(w => (
          <button
            key={w.id}
            onClick={() => onClickWindow(w.id)}
            className={`px-3 py-1 rounded-md text-xs font-[family-name:var(--font-jetbrains-mono)] transition-all shrink-0 ${
              w.isMinimized
                ? 'text-dim bg-transparent hover:bg-white/5'
                : 'text-text bg-white/[0.06] border border-white/[0.06]'
            }`}
          >
            {w.title}
          </button>
        ))}
      </div>

      {/* Clock */}
      <span className="font-[family-name:var(--font-jetbrains-mono)] text-dim text-xs shrink-0">
        {time}
      </span>
    </div>
  );
}
