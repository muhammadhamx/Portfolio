'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { contactInfo } from '@/lib/data';

export default function ContactApp() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Hamza,\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.open(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Status */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
          <span className="text-green text-xs font-[family-name:var(--font-jetbrains-mono)]">
            OPEN TO WORK
          </span>
        </div>
        <p className="text-text text-sm font-[family-name:var(--font-space-grotesk)] font-semibold">
          Let&apos;s Build Something.
        </p>
        <p className="text-dim text-xs mt-1">
          Open to Lead Engineer roles in Islamabad / Rawalpindi and remote opportunities.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        <a
          href={`mailto:${contactInfo.email}`}
          className="flex items-center gap-3 text-dim hover:text-cyan transition text-sm group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan/10 transition shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
          </div>
          {contactInfo.email}
        </a>
        <a
          href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-3 text-dim hover:text-cyan transition text-sm group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan/10 transition shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          {contactInfo.phone}
        </a>
        <a
          href={contactInfo.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-dim hover:text-cyan transition text-sm group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan/10 transition shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </div>
          {contactInfo.github}
        </a>
        <div className="flex items-center gap-3 text-dim text-sm">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          {contactInfo.location}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Contact Form — opens user's email client */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="text-dim text-xs mb-1.5 block">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-text text-sm placeholder-dim/50 focus:border-cyan focus:outline-none transition"
          />
        </div>
        <div>
          <label className="text-dim text-xs mb-1.5 block">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-text text-sm placeholder-dim/50 focus:border-cyan focus:outline-none transition"
          />
        </div>
        <div>
          <label className="text-dim text-xs mb-1.5 block">Message</label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Your message..."
            value={form.message}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-text text-sm placeholder-dim/50 focus:border-cyan focus:outline-none transition resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-cyan text-deep font-semibold py-2.5 rounded-lg hover:bg-cyan/90 transition text-sm font-[family-name:var(--font-space-grotesk)]"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
