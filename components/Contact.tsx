'use client';

import { motion } from 'framer-motion';
import { contactInfo } from '@/lib/data';

const headingWords = ["Let's", 'Build', 'Something.'];

const wordAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 10,
      delay: i * 0.15,
    },
  }),
};

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* LEFT */}
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold text-text flex flex-wrap gap-x-4">
            {headingWords.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Subtext */}
          <p className="text-dim text-lg">
            Open to Lead Engineer roles in Islamabad / Rawalpindi and remote
            opportunities.
          </p>

          {/* Contact details */}
          <ul className="space-y-4">
            {/* Email */}
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-dim hover:text-cyan transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                {contactInfo.email}
              </a>
            </li>

            {/* Phone */}
            <li>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-dim hover:text-cyan transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                {contactInfo.phone}
              </a>
            </li>

            {/* GitHub */}
            <li>
              <a
                href={contactInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-dim hover:text-cyan transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
                {contactInfo.github}
              </a>
            </li>

            {/* Location */}
            <li>
              <span className="flex items-center gap-3 text-dim">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {contactInfo.location}
              </span>
            </li>
          </ul>
        </div>

        {/* RIGHT - Contact form */}
        <div className="glass-card p-8">
          {/* Replace YOUR_FORM_ID with your Formspree form ID */}
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="text-sm text-dim mb-2 block">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text placeholder-dim focus:border-cyan focus:outline-none transition w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm text-dim mb-2 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text placeholder-dim focus:border-cyan focus:outline-none transition w-full"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm text-dim mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me about your project..."
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text placeholder-dim focus:border-cyan focus:outline-none transition w-full resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan text-deep font-semibold py-3 rounded-lg hover:bg-cyan/90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
