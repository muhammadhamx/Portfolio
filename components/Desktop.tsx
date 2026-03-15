'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcons from './DesktopIcons';
import AboutApp from './apps/AboutApp';
import ExperienceApp from './apps/ExperienceApp';
import ProjectsApp from './apps/ProjectsApp';
import SkillsApp from './apps/SkillsApp';
import ContactApp from './apps/ContactApp';
import TerminalApp from './apps/TerminalApp';
import WelcomeWidget from './WelcomeWidget';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

export interface AppConfig {
  id: string;
  title: string;
  iconText: string;
  iconColor: string;
}

interface WindowState {
  id: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

export const APPS: AppConfig[] = [
  { id: 'about', title: 'about.sys', iconText: 'SYS', iconColor: '#00D4FF' },
  { id: 'experience', title: 'experience.log', iconText: 'LOG', iconColor: '#7B2FFF' },
  { id: 'projects', title: 'projects/', iconText: 'DEV', iconColor: '#00FF88' },
  { id: 'skills', title: 'skills.cfg', iconText: 'CFG', iconColor: '#FF8C00' },
  { id: 'contact', title: 'contact.sh', iconText: '.SH', iconColor: '#FF69B4' },
  { id: 'terminal', title: 'terminal', iconText: '>_', iconColor: '#00D4FF' },
];

export default function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZ, setNextZ] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileApp, setMobileApp] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-open terminal after boot
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => openApp('terminal'), 4000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const openApp = useCallback((appId: string) => {
    if (isMobile) {
      setMobileApp(appId);
      return;
    }
    setWindows(prev => {
      const existing = prev.find(w => w.id === appId);
      if (existing) {
        return prev.map(w =>
          w.id === appId ? { ...w, isMinimized: false, zIndex: nextZ } : w
        );
      }
      const app = APPS.find(a => a.id === appId);
      if (!app) return prev;
      const cascade = prev.length % 6;
      const x = Math.max(60, Math.floor((window.innerWidth - 700) / 2) + cascade * 32);
      const y = Math.max(30, Math.floor((window.innerHeight - 500) / 2) + cascade * 28);
      return [
        ...prev,
        {
          id: appId,
          title: app.title,
          isMinimized: false,
          isMaximized: false,
          position: { x, y },
          zIndex: nextZ,
        },
      ];
    });
    setNextZ(z => z + 1);
  }, [nextZ, isMobile]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setNextZ(prev => {
      setWindows(ws => ws.map(w => (w.id === id ? { ...w, zIndex: prev } : w)));
      return prev + 1;
    });
  }, []);

  const handleTaskbarClick = useCallback((id: string) => {
    setWindows(prev => {
      const win = prev.find(w => w.id === id);
      if (!win) return prev;
      if (win.isMinimized) {
        return prev.map(w => (w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w));
      }
      return prev;
    });
    setNextZ(z => z + 1);
  }, [nextZ]);

  const renderApp = (id: string) => {
    switch (id) {
      case 'about': return <AboutApp />;
      case 'experience': return <ExperienceApp />;
      case 'projects': return <ProjectsApp />;
      case 'skills': return <SkillsApp />;
      case 'contact': return <ContactApp />;
      case 'terminal': return <TerminalApp openApp={openApp} />;
      default: return null;
    }
  };

  // --- Mobile layout ---
  if (isMobile) {
    return (
      <div className="h-[100dvh] w-screen overflow-hidden bg-deep relative">
        <ParticleField scrollProgress={0} />
        <AnimatePresence>
          {mobileApp && (
            <div className="fixed inset-0 z-30 bg-deep/95 backdrop-blur-xl overflow-auto">
              <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0d1117]/90 backdrop-blur-xl border-b border-white/[0.06]">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-cyan text-xs tracking-wide">
                  {APPS.find(a => a.id === mobileApp)?.title}
                </span>
                <button
                  onClick={() => setMobileApp(null)}
                  className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-dim hover:text-text transition text-sm"
                >
                  x
                </button>
              </div>
              <div className="p-4">{renderApp(mobileApp)}</div>
            </div>
          )}
        </AnimatePresence>
        {!mobileApp && (
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-text mb-1 tracking-tight">
              HAMZA<span className="text-cyan">.DEV</span>
            </h1>
            <p className="text-dim text-sm mb-10 font-[family-name:var(--font-jetbrains-mono)]">
              Lead Software Engineer
            </p>
            <div className="grid grid-cols-3 gap-5">
              {APPS.map(app => (
                <button
                  key={app.id}
                  onClick={() => openApp(app.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/5 active:bg-white/10 transition"
                >
                  <div
                    className="w-14 h-14 rounded-2xl bg-[#0d1117]/80 border flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold transition"
                    style={{ color: app.iconColor, borderColor: `${app.iconColor}33` }}
                  >
                    {app.iconText}
                  </div>
                  <span className="text-[10px] text-dim">{app.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Desktop layout ---
  return (
    <div className="h-screen w-screen overflow-hidden bg-deep relative select-none">
      <ParticleField scrollProgress={0} />

      {/* Welcome widget - always visible behind windows */}
      <WelcomeWidget onOpen={openApp} />

      <DesktopIcons apps={APPS} onOpen={openApp} />

      <AnimatePresence>
        {windows.map(win =>
          !win.isMinimized ? (
            <Window
              key={win.id}
              {...win}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onToggleMaximize={() => toggleMaximize(win.id)}
              onFocus={() => bringToFront(win.id)}
            >
              {renderApp(win.id)}
            </Window>
          ) : null
        )}
      </AnimatePresence>

      <Taskbar
        windows={windows.map(w => ({ id: w.id, title: w.title, isMinimized: w.isMinimized }))}
        onClickWindow={handleTaskbarClick}
      />
    </div>
  );
}
