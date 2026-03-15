'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '> INITIALIZING SYSTEM...', color: '#00FF88' },
  { text: '> LOADING MODULES ████████████ 100%', color: '#00FF88' },
  { text: '> CONNECTING TO NETWORK...', color: '#00FF88' },
  { text: '> ESTABLISHING SECURE LINK...', color: '#00FF88' },
  { text: '> SYSTEM READY', color: '#00FF88' },
  { text: '> WELCOME TO HAMZA.DEV', color: '#00D4FF', isTitle: true },
];

const LINE_DELAY = 200;
const FADE_OUT_DELAY = 500;

export default function BootSequence() {
  const [visible, setVisible] = useState(true);
  const [visibleLines, setVisibleLines] = useState<number>(0);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  // Lock body scroll while boot sequence is active
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  // Reveal lines one by one, then fade out after a delay
  useEffect(() => {
    if (!visible) return;

    if (visibleLines < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, LINE_DELAY);
      return () => clearTimeout(timer);
    }

    // All lines shown — wait, then dismiss
    const fadeTimer = setTimeout(dismiss, FADE_OUT_DELAY);
    return () => clearTimeout(fadeTimer);
  }, [visible, visibleLines, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot-overlay"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onClick={dismiss}
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black font-[family-name:var(--font-jetbrains-mono)]"
        >
          <div className="flex w-full max-w-2xl flex-col gap-2 px-6">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className={
                  line.isTitle
                    ? 'mt-2 text-xl font-bold sm:text-2xl'
                    : 'text-sm sm:text-base'
                }
                style={{ color: line.color }}
              >
                {line.text}
              </motion.p>
            ))}

            {/* Blinking cursor after the last visible line */}
            {visibleLines > 0 && visibleLines <= BOOT_LINES.length && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block h-5 w-2.5"
                style={{ backgroundColor: '#00FF88' }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
