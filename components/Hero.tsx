'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useAnimation } from 'framer-motion';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

const NAME = 'MUHAMMAD HAMZA SAJID';
const TITLE = 'Lead Software Engineer';
const TAGLINE = 'Architecting systems that scale. Leading teams that ship.';
const BADGES = ['4+ Years', '9 Production Systems', 'Lead → Architect'];
const BOOT_DELAY = 3500; // ms - wait for boot sequence

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showName, setShowName] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [showBadges, setShowBadges] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.min(
        Math.max(-rect.top / rect.height, 0),
        1
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Boot delay + animation sequencing
  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBootComplete(true);
      setShowCursor(true);
    }, BOOT_DELAY);

    return () => clearTimeout(bootTimer);
  }, []);

  // Sequence after boot
  useEffect(() => {
    if (!bootComplete) return;

    // Cursor blinks then fades out
    const cursorFade = setTimeout(() => {
      setCursorVisible(false);
    }, 1500);

    // Name appears
    const nameTimer = setTimeout(() => {
      setShowName(true);
    }, 200);

    // Line draws after name
    const lineTimer = setTimeout(() => {
      setShowLine(true);
    }, 1200);

    // Typewriter title starts after line
    const titleTimer = setTimeout(() => {
      startTypewriter();
    }, 2200);

    // Badges after title
    const badgeTimer = setTimeout(() => {
      setShowBadges(true);
    }, 4000);

    // Tagline after badges
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 4800);

    // CTAs last
    const ctaTimer = setTimeout(() => {
      setShowCTAs(true);
    }, 5400);

    return () => {
      clearTimeout(cursorFade);
      clearTimeout(nameTimer);
      clearTimeout(lineTimer);
      clearTimeout(titleTimer);
      clearTimeout(badgeTimer);
      clearTimeout(taglineTimer);
      clearTimeout(ctaTimer);
    };
  }, [bootComplete]);

  // Typewriter effect
  const startTypewriter = () => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedTitle(TITLE.slice(0, i));
      if (i >= TITLE.length) {
        clearInterval(interval);
      }
    }, 50);
  };

  // Letter animation variants
  const letterContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const letterVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'tween' as const, duration: 0.3 },
    },
  };

  const badgeVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
        delay: i * 0.15,
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleField scrollProgress={scrollProgress} />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Terminal Cursor */}
        {showCursor && (
          <div
            className={`mb-6 transition-opacity duration-500 ${
              cursorVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span
              className="text-cyan text-4xl font-[family-name:var(--font-jetbrains-mono)] animate-blink"
            >
              _
            </span>
          </div>
        )}

        {/* Name */}
        {showName && (
          <motion.h1
            className="glitch font-[family-name:var(--font-space-grotesk)] text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            data-text={NAME}
            variants={letterContainer}
            initial="hidden"
            animate="visible"
          >
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariant}
                className="inline-block"
                style={char === ' ' ? { width: '0.3em' } : undefined}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        )}

        {/* Gradient Line */}
        {showLine && (
          <div className="flex justify-center mb-6">
            <div
              className="h-[2px] bg-gradient-to-r from-cyan to-violet overflow-hidden"
              style={{
                animation: 'drawLine 0.8s ease-out forwards',
              }}
            />
          </div>
        )}

        {/* Title - Typewriter */}
        <div className="h-8 mb-6">
          {typedTitle && (
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xl text-cyan">
              {typedTitle}
              <span className="animate-blink">|</span>
            </p>
          )}
        </div>

        {/* Badges */}
        {showBadges && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {BADGES.map((badge, i) => (
              <motion.span
                key={badge}
                custom={i}
                variants={badgeVariant}
                initial="hidden"
                animate="visible"
                className="px-4 py-2 rounded-full text-sm bg-white/5 backdrop-blur-sm border border-white/10 text-white/80"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        )}

        {/* Tagline */}
        {showTagline && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-dim italic mb-10 text-lg"
          >
            {TAGLINE}
          </motion.p>
        )}

        {/* CTA Buttons */}
        {showCTAs && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#projects"
              className="bg-cyan text-deep font-semibold rounded-lg px-8 py-3 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-shadow duration-300"
            >
              View My Work
            </a>
            <a
              href="/assets/cv/Muhammad_Hamza_Sajid_CV.pdf"
              download
              className="border border-cyan text-cyan rounded-lg px-8 py-3 hover:bg-cyan/10 transition-colors duration-300"
            >
              Download CV
            </a>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      {bootComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dim"
        >
          <span className="text-xs font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-widest">
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      )}

      {/* Inline keyframes for the line draw animation and blink */}
      <style jsx>{`
        @keyframes drawLine {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
}
