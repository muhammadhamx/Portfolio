'use client';

import { useState, useRef, useEffect, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { motion } from 'framer-motion';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus: () => void;
}

export default function Window({
  title, children, isMinimized, isMaximized,
  position, zIndex, onClose, onMinimize, onToggleMaximize, onFocus,
}: WindowProps) {
  const [pos, setPos] = useState(position);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const onTitleMouseDown = (e: ReactMouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-btn')) return;
    if (isMaximized) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    onFocus();
  };

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (!isDragging.current) return;
      setPos({
        x: Math.max(0, Math.min(e.clientX - dragStart.current.x, window.innerWidth - 200)),
        y: Math.max(0, Math.min(e.clientY - dragStart.current.y, window.innerHeight - 100)),
      });
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: 30, transition: { duration: 0.15 } }}
      transition={{ type: 'spring' as const, stiffness: 400, damping: 28 }}
      className="fixed rounded-xl overflow-hidden shadow-2xl shadow-black/50"
      style={{
        zIndex,
        left: isMaximized ? 0 : pos.x,
        top: isMaximized ? 0 : pos.y,
        width: isMaximized ? '100vw' : 'min(700px, 90vw)',
        height: isMaximized ? 'calc(100vh - 48px)' : 'auto',
      }}
      onClick={onFocus}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 bg-[#0d1117]/90 backdrop-blur-xl border-b border-white/[0.06] select-none"
        style={{ cursor: isMaximized ? 'default' : 'move' }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={onToggleMaximize}
      >
        <div className="flex items-center gap-3">
          <div className="window-btn flex gap-1.5">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-125 transition"
              aria-label="Close"
            />
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-125 transition"
              aria-label="Minimize"
            />
            <button
              onClick={onToggleMaximize}
              className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-125 transition"
              aria-label="Maximize"
            />
          </div>
          <span className="text-xs text-dim font-[family-name:var(--font-jetbrains-mono)] tracking-wide">
            {title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="bg-[#0a0e17]/95 backdrop-blur-xl overflow-y-auto overflow-x-hidden"
        style={{ maxHeight: isMaximized ? 'calc(100vh - 88px)' : 'min(550px, 70vh)' }}
      >
        {children}
      </div>
    </motion.div>
  );
}
