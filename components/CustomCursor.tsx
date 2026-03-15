'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const DOT_SIZE = 8;
const RING_SIZE = 40;
const HOVER_SCALE = 1.5;
const CYAN = '#00D4FF';

const HOVER_SELECTOR = 'a, button, [data-hover]';

export default function CustomCursor() {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Raw cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot follows tightly
  const dotX = useSpring(cursorX, { stiffness: 800, damping: 35, mass: 0.2 });
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 35, mass: 0.2 });

  // Ring follows with more lag
  const ringX = useSpring(cursorX, { stiffness: 250, damping: 30, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 250, damping: 30, mass: 0.5 });

  // Ring scale with spring
  const ringScaleRaw = useMotionValue(1);
  const ringScale = useSpring(ringScaleRaw, { stiffness: 400, damping: 25 });

  // Detect pointer:fine on mount
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mq.matches);

    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track mouse movement
  useEffect(() => {
    if (!hasFinePointer) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [hasFinePointer, cursorX, cursorY]);

  // Handle hover detection via event delegation
  const handlePointerOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(HOVER_SELECTOR)) {
        setIsHovering(true);
        ringScaleRaw.set(HOVER_SCALE);
      }
    },
    [ringScaleRaw],
  );

  const handlePointerOut = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(HOVER_SELECTOR)) {
        setIsHovering(false);
        ringScaleRaw.set(1);
      }
    },
    [ringScaleRaw],
  );

  useEffect(() => {
    if (!hasFinePointer) return;

    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
    };
  }, [hasFinePointer, handlePointerOver, handlePointerOut]);

  // Hide default cursor globally when custom cursor is active
  useEffect(() => {
    if (!hasFinePointer) return;

    const style = document.createElement('style');
    style.id = 'custom-cursor-hide';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 rounded-full"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: CYAN,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 rounded-full"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          border: `1.5px solid ${CYAN}4D`, // 4D hex = ~30% opacity
          backgroundColor: 'transparent',
          x: ringX,
          y: ringY,
          scale: ringScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
