'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';

interface TerminalAppProps {
  openApp: (id: string) => void;
}

const NEOFETCH = `
  ██╗  ██╗ █████╗ ███╗   ███╗███████╗ █████╗
  ██║  ██║██╔══██╗████╗ ████║╚══███╔╝██╔══██╗
  ███████║███████║██╔████╔██║  ███╔╝ ███████║
  ██╔══██║██╔══██║██║╚██╔╝██║ ███╔╝  ██╔══██║
  ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗██║  ██║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝

  hamza@portfolio
  ─────────────────
  OS:        HamzaOS v2.0
  Role:      Lead Software Engineer
  Exp:       4+ years
  Systems:   9 shipped to production
  Team:      5 engineers led
  Location:  Islamabad, Pakistan
  Stack:     Full Stack + AI
  Status:    Open to opportunities
`;

const HELP_TEXT = `Available commands:

  about       Who am I
  skills      Technical skills
  projects    Production systems I've built
  experience  Work history
  contact     Get in touch
  neofetch    System info
  open <app>  Open an app window (about, projects, etc.)
  ls          List available apps
  clear       Clear terminal
  date        Current date
  github      Open GitHub profile
  resume      Download CV
  help        Show this message`;

export default function TerminalApp({ openApp }: TerminalAppProps) {
  const [history, setHistory] = useState<Array<{ input: string; output: string; isHtml?: boolean }>>([
    { input: '', output: `Welcome to HamzaOS Terminal v2.0\nType 'help' for available commands.\n` },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const execute = (raw: string): string => {
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0]?.toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        return HELP_TEXT;
      case 'neofetch':
      case 'sysinfo':
        return NEOFETCH;
      case 'about':
      case 'whoami':
        return 'Muhammad Hamza Sajid — Lead Software Engineer\n4+ years | 9 production systems | Full Stack + AI';
      case 'skills':
        return [
          'Backend:   Node.js, Django, FastAPI, NestJS, Express',
          'Frontend:  React, Angular, Next.js, TypeScript',
          'Mobile:    Flutter, BLoC, Firebase, Ionic',
          'Database:  PostgreSQL, MongoDB, Redis, MySQL',
          'DevOps:    AWS, Docker, Nginx, GitHub Actions',
          'AI/Data:   PDF Extraction, AI Ranking, Web Scraping',
        ].join('\n');
      case 'projects':
        return [
          '1. HakemAI      — AI Insurance Comparison    [hakem.ai]',
          '2. Swaapty       — Real-Time Swap Marketplace [swaapty.com]',
          '3. BlissChat     — Social Platform            [blisschat.live]',
          '4. SecureChat    — E2E Encrypted Messaging    [GitHub]',
          '5. MT5 Trading   — Algorithmic Trading Engine  [GitHub]',
          '6. UK Scraper    — B2B Intelligence Tool       [GitHub]',
          '7. Saleto        — Email Management Platform',
          '8. AllBooked     — Workforce SaaS              [allbooked.co.uk]',
          '9. HR System     — Hospital HR/Payroll (France) [Vercel]',
          '',
          "Type 'open projects' to see full details.",
        ].join('\n');
      case 'experience':
      case 'exp':
        return [
          'Lead Software Engineer — Camden Health System',
          'Aug 2024 – Feb 2026 | Lahore, Pakistan',
          '→ Led 5 engineers across 4 concurrent products.',
          '→ Architected 4 production systems.',
          '',
          'Senior Software Engineer — HurTech',
          'Mar 2021 – Jul 2024 | Bahawalpur, Pakistan',
          '→ Most senior engineer. 5 production apps shipped.',
          '',
          "Type 'open experience' for full details.",
        ].join('\n');
      case 'contact':
        return [
          'Email:    codx.hamza@gmail.com',
          'Phone:    +92 347 886 6012',
          'GitHub:   github.com/muhammadhamx',
          'Location: Islamabad, Pakistan',
          '',
          "Type 'open contact' to send a message.",
        ].join('\n');
      case 'open': {
        const validApps = ['about', 'experience', 'projects', 'skills', 'contact', 'terminal'];
        if (validApps.includes(arg)) {
          openApp(arg);
          return `Opening ${arg}...`;
        }
        return `Unknown app: ${arg}\nAvailable: ${validApps.join(', ')}`;
      }
      case 'ls':
        return 'about.sys  experience.log  projects/  skills.cfg  contact.sh  terminal  resume.pdf';
      case 'clear':
        return '__CLEAR__';
      case 'date':
        return new Date().toString();
      case 'github':
        window.open('https://github.com/muhammadhamx', '_blank');
        return 'Opening GitHub...';
      case 'resume':
      case 'cv': {
        const link = document.createElement('a');
        link.href = '/cv/Muhammad_Hamza_Sajid_CV.docx';
        link.download = '';
        link.click();
        return 'Downloading resume...';
      }
      case 'sudo':
        return 'Nice try. You do not have root access on this system.';
      case 'rm':
        return 'Permission denied. This portfolio is production. No deleting.';
      case 'exit':
        return "You can't exit. You're already in.";
      case '':
        return '';
      default:
        return `Command not found: ${cmd}\nType 'help' for available commands.`;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIdx(-1);

    const output = execute(cmd);
    if (output === '__CLEAR__') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { input: cmd, output }]);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    }
  };

  return (
    <div
      className="p-4 font-[family-name:var(--font-jetbrains-mono)] text-sm min-h-[300px] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, i) => (
        <div key={i} className="mb-1">
          {entry.input && (
            <div>
              <span className="text-cyan">hamza@portfolio</span>
              <span className="text-dim">:</span>
              <span className="text-violet">~</span>
              <span className="text-dim">$ </span>
              <span className="text-text">{entry.input}</span>
            </div>
          )}
          <pre className="text-dim whitespace-pre-wrap text-xs leading-relaxed">{entry.output}</pre>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-cyan shrink-0">hamza@portfolio</span>
        <span className="text-dim shrink-0">:</span>
        <span className="text-violet shrink-0">~</span>
        <span className="text-dim shrink-0">$ </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-1 text-green ml-1 caret-green"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
