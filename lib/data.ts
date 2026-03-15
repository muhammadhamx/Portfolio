export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  gradient: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  promoted?: boolean;
  promotedFrom?: string;
  bullets: string[];
}

export interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}

export const projects: Project[] = [
  {
    id: "hakem-ai",
    title: "HakemAI",
    subtitle: "AI-Powered Insurance Comparison Platform",
    description:
      "Sole architect and lead engineer. Custom PDF extraction pipeline parsing rate tables and benefit classifications, AI ranking model scoring plans side-by-side, RFQ comparison engine. Full production migration from AWS EC2 to VPS under live client deadline.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "MongoDB", "PDF Extraction", "AI Ranking"],
    liveUrl: "https://hakem.ai/",
    featured: true,
    gradient: "from-cyan/20 to-violet/20",
  },
  {
    id: "swaapty",
    title: "Swaapty",
    subtitle: "Real-Time Product Swap Marketplace",
    description:
      "Architected NestJS backend, designed TypeORM schema, led full deployment pipeline. Real-time chat and live notifications for concurrent users.",
    stack: ["Next.js", "NestJS", "TypeORM", "PostgreSQL", "Docker", "Nginx"],
    liveUrl: "https://swaapty.com/",
    featured: true,
    gradient: "from-violet/20 to-cyan/20",
  },
  {
    id: "blisschat",
    title: "BlissChat",
    subtitle: "Full-Stack Real-Time Social Platform",
    description:
      "Designed Django backend architecture, led WebSocket integration, engineered a fully custom Django admin panel with page creation, approval workflows, and site-wide content management.",
    stack: ["React.js", "Django", "PostgreSQL", "WebSockets", "Custom Admin"],
    liveUrl: "https://blisschat.live/",
    featured: false,
    gradient: "from-cyan/10 to-violet/10",
  },
  {
    id: "securechat",
    title: "SecureChat",
    subtitle: "Privacy-First Cross-Platform Messaging App",
    description:
      "Sole architect. Clean Architecture (Domain/Data/Presentation), BLoC state management. Auto-deleting messages, screenshot prevention, SHA-256 passwords, group chats, voice messages, QR discovery, FCM notifications.",
    stack: ["Flutter", "Dart", "Firebase", "BLoC", "Clean Architecture"],
    githubUrl: "https://github.com/muhammadhamx/secure-chatapp",
    featured: true,
    gradient: "from-violet/20 to-pink/20",
  },
  {
    id: "mt5",
    title: "MT5 Asian Liquidity Sweep",
    subtitle: "Algorithmic Trading Strategy Engine",
    description:
      "6-stage state machine (IDLE→SWEPT→CONFIRMED→ARMED→IN_TRADE→COOLDOWN), Asian range detection 00:00–06:00 UTC, BOS/CHOCH reversal confirmation on M1/M5, mock MT5 service for backtesting.",
    stack: ["Python", "Django", "MT5", "State Machine", "REST API"],
    githubUrl: "https://github.com/muhammadhamx/MT5-Asian_Trading_System-",
    featured: false,
    gradient: "from-green/10 to-cyan/10",
  },
  {
    id: "uk-scraper",
    title: "UK Company Scraper",
    subtitle: "Multi-Source B2B Intelligence Tool",
    description:
      "5 simultaneous scrapers — Companies House, LinkedIn, Google, Crunchbase, D&B. Consolidated company profiles, active director details, contact data. CSV/Excel export with configurable speed/coverage trade-offs.",
    stack: ["Python", "Django", "Web Scraping", "PostgreSQL", "REST API"],
    githubUrl: "https://github.com/muhammadhamx/uk_companyScrapper",
    featured: false,
    gradient: "from-orange/10 to-gold/10",
  },
  {
    id: "saleto",
    title: "Saleto",
    subtitle: "Personalised Email Management Platform",
    description:
      "Mailcow Postfix/IMAP/Dovecot integration for full mail server control. Celery + Redis async task queue for reliable delivery at scale. Full inbox management with send/receive tracking.",
    stack: ["Angular", "Django", "Redis", "Celery", "PostgreSQL", "MongoDB"],
    featured: false,
    gradient: "from-pink/10 to-violet/10",
  },
  {
    id: "allbooked",
    title: "AllBooked",
    subtitle: "Workforce Management SaaS",
    description:
      "Multi-tenant SaaS — staff scheduling, shift management, time tracking, payroll, invoicing, internal messaging. Role separation between staff and administrators.",
    stack: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://allbooked.co.uk/",
    featured: false,
    gradient: "from-cyan/10 to-green/10",
  },
  {
    id: "hr-system",
    title: "HR Management System",
    subtitle: "Hospital HR & Payroll — CHU de Cocody Hospital, France",
    description:
      "Centralised HR platform for a French hospital client — employee records, payroll processing, administrative workflows.",
    stack: ["Angular", "Material UI", "TypeScript"],
    liveUrl: "https://hr-angular-front.vercel.app/overview",
    featured: false,
    gradient: "from-violet/10 to-cyan/10",
  },
];

export const experiences: Experience[] = [
  {
    role: "Lead Software Engineer",
    company: "Camden Health System",
    period: "Aug 2024 – Feb 2026",
    location: "Lahore, Pakistan · On-site",
    promoted: true,
    promotedFrom: "Senior",
    bullets: [
      "Promoted to Lead Engineer within 6 months — owned technical direction, sprint planning, and architecture decisions across 4 concurrent production products",
      "Architected full backend systems for Swaapty, BlissChat, UK Company Scraper, and MT5 Trading System — selected stacks, defined data models, established API contracts",
      "Led a 5-engineer team: set coding standards, drove code reviews, resolved architectural blockers, ensured on-time production releases via GitHub Actions CI/CD",
      "Designed and enforced database architecture across PostgreSQL, MongoDB, and MySQL — introduced query optimisation patterns cutting response times on critical endpoints",
      "Owned all AWS EC2 infrastructure: Nginx reverse proxy, Dockerised deployments, production incident response",
      "Introduced WebSocket architecture across multiple products — defined integration patterns adopted by the entire frontend team",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "HurTech",
    period: "Mar 2021 – Jul 2024",
    location: "Bahawalpur, Pakistan",
    bullets: [
      "Most senior engineer on the team — independently architected and delivered 5 production applications across POS, workforce management, and client-facing domains",
      "Designed system architecture from scratch for every engagement: tech selection, schema design, API structure, auth flows, deployment strategy — no senior oversight",
      "Engineered RBAC systems, real-time data sync layers, and end-to-end payment workflow integrations across multiple concurrent projects",
      "Sole architect and developer of SecureChat — designed Clean Architecture, selected BLoC for state management, shipped production Flutter app with E2E encryption",
      "Owned client relationships across 5+ engagements — led discovery sessions, defined scope, drove delivery, managed post-launch support independently",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Backend",
    color: "#00D4FF",
    skills: ["Node.js", "Express.js", "Django", "FastAPI", "NestJS", "REST APIs", "WebSockets", "JWT"],
  },
  {
    name: "Frontend",
    color: "#7B2FFF",
    skills: ["Angular", "React.js", "Next.js", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "Material UI"],
  },
  {
    name: "Mobile & Desktop",
    color: "#FF69B4",
    skills: ["Flutter", "BLoC", "Firebase", "Ionic", "Electron", "PWA"],
  },
  {
    name: "Databases",
    color: "#00FF88",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "TypeORM", "Query Optimisation"],
  },
  {
    name: "AI & Data",
    color: "#FFD700",
    skills: ["PDF Extraction", "AI Ranking/Scoring", "Web Scraping", "Celery", "Data Pipelines"],
  },
  {
    name: "Cloud & DevOps",
    color: "#FF8C00",
    skills: ["AWS EC2", "AWS S3", "Docker", "Nginx", "GitHub Actions CI/CD", "Linux", "VPS Migration"],
  },
  {
    name: "Leadership",
    color: "#C0C0C0",
    skills: ["System Architecture", "Technical Direction", "Engineering Standards", "Code Review", "Sprint Planning"],
  },
];

export const contactInfo = {
  email: "codx.hamza@gmail.com",
  phone: "+92 347 886 6012",
  github: "github.com/muhammadhamx",
  githubUrl: "https://github.com/muhammadhamx",
  location: "Islamabad, Pakistan",
};

export const stats = [
  { label: "Years Experience", target: 4, suffix: "+" },
  { label: "Production Systems", target: 9, suffix: "" },
  { label: "Engineers Led", target: 5, suffix: "" },
  { label: "Domains Delivered", target: 6, suffix: "+" },

];
