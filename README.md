# HamzaOS — Interactive Portfolio

An OS-style interactive portfolio that turns the traditional "scroll and read" experience into something you actually want to play with. Built as a desktop environment with draggable windows, a working terminal, and a Three.js particle wallpaper.

**Live:** [muhammadhamxa.vercel.app](https://muhammadhamxa.vercel.app/)

---

## What Makes This Different

This is not a standard portfolio. It's a fully interactive desktop OS running in the browser:

- **Desktop Environment** — Draggable, resizable windows with macOS-style controls (close, minimize, maximize)
- **Working Terminal** — Type real commands: `neofetch`, `skills`, `projects`, `open about`, and more
- **Three.js Particle Field** — 1,500 particles forming a neural network with mouse repulsion and auto-rotation
- **Boot Sequence** — Terminal-style loading animation on first visit
- **Custom Cursor** — Cyan dot + ring that reacts to interactive elements
- **Welcome Dashboard** — Live clock, quick-launch buttons, availability status
- **Taskbar** — Shows open windows and live clock, just like a real OS
- **3D Tilt Cards** — Project cards respond to cursor position with perspective transforms
- **Mobile Responsive** — Switches to a phone-style app launcher on small screens

### Terminal Easter Eggs

```
$ sudo          → "Nice try. You do not have root access on this system."
$ rm            → "Permission denied. This portfolio is production. No deleting."
$ exit          → "You can't exit. You're already in."
$ neofetch      → Full ASCII art system info
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Static Export) |
| Language | TypeScript |
| 3D Graphics | Three.js |
| Animations | Framer Motion |
| Scroll Effects | GSAP ScrollTrigger |
| Styling | Tailwind CSS v4 |
| Fonts | Space Grotesk, Inter, JetBrains Mono |
| Deployment | GitHub Pages + Vercel |

---

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts + metadata
│   ├── page.tsx            # Composes Desktop, BootSequence, CustomCursor
│   └── globals.css         # Design system, glass effects, animations
├── components/
│   ├── Desktop.tsx         # Main OS — window state, app routing, mobile/desktop layout
│   ├── Window.tsx          # Draggable window with title bar controls
│   ├── Taskbar.tsx         # Bottom bar with open windows + clock
│   ├── DesktopIcons.tsx    # Sidebar app shortcuts
│   ├── WelcomeWidget.tsx   # Clock + quick launch dashboard
│   ├── BootSequence.tsx    # Terminal boot animation
│   ├── CustomCursor.tsx    # Animated cursor dot + ring
│   ├── ParticleField.tsx   # Three.js neural network background
│   └── apps/
│       ├── AboutApp.tsx    # Profile + animated stat counters
│       ├── ExperienceApp.tsx # Timeline with promoted badge
│       ├── ProjectsApp.tsx # 3D tilt project cards
│       ├── SkillsApp.tsx   # Categorized skill chips with glow
│       ├── ContactApp.tsx  # Contact form (mailto) + details
│       └── TerminalApp.tsx # Interactive CLI with 15+ commands
├── lib/
│   └── data.ts             # All portfolio content (typed, centralized)
└── .github/
    └── workflows/
        └── deploy.yml      # Auto-deploy to GitHub Pages on push
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see it locally.

---

## Deployment

**Vercel** — Auto-deploys on push (no basePath).

**GitHub Pages** — Auto-deploys via GitHub Actions with `basePath: "/portfolio"`.

Both are handled by a conditional `next.config.ts`:

```ts
const isGitHubPages = process.env.GITHUB_PAGES === "true";
basePath: isGitHubPages ? "/portfolio" : ""
```

---

## Author

**Muhammad Hamza Sajid**
Lead Software Engineer | 4+ years | 9 production systems

- Email: codx.hamza@gmail.com
- GitHub: [muhammadhamx](https://github.com/muhammadhamx)
- Location: Islamabad, Pakistan
