# 🌐 Retro-Futuristic Portfolio Landing Page

A production-ready, mobile-first portfolio landing page built with a custom **Retro-Futuristic Surveillance System** aesthetic. Features an immersive book-page flip navigation and highly dynamic visual effects that react to user input and page state.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8)

## ✨ Core Features & Visual Breakdown

| Feature | Description | Implementation Details |
|---------|-------------|------------------------|
| **Realistic Page Flip** | The primary site navigation triggers a smooth, 3D book-page turning animation | Uses Framer Motion combined with CSS `transform: rotateY()` and a `perspective: 1400px` container. Includes fade fallback for `prefers-reduced-motion` |
| **50/50 Split Background** | The background is divided into two themed halves with contrasting movement | **Left (Retro/Past):** Subtle Dust Drift animation (`--color-sepia`). **Right (Future/Cyber):** Intermittent Glitch Flicker animation (`--color-neon-cyan`). Implemented via fixed, layered CSS `::before` and `::after` pseudo-elements |
| **Orbital Tracker Core** | The fixed, bottom-centered mascot acts as a high-tech monitoring system | Uses React Trigonometry (`Math.atan2`) and Framer Motion `useSpring` to smoothly rotate an internal satellite to follow the mouse cursor's exact position |
| **State-Based Theming** | The Orbital Core's glow and the primary theme color change dynamically based on the current page | E.g., Neon Cyan on Home, Gold on About, Pink on Projects, Green on Contact |
| **Glitch Text Hover** | Primary page headings scramble their characters on hover | Custom `GlitchText` component uses string manipulation and an internal timer to cycle characters from right to left |
| **Multi-Genre Audio Jukebox** | Users can select background music from a dedicated menu in the top-left corner | Howler.js manages multiple playlists (Classical, Jazz, Piano) and persists the user's genre and mute preference in localStorage |
| **Scroll Feedback** | Scrolling within a page provides thematic feedback | Custom CSS for themed scrollbars and a brief neon pulse on overscroll |
| **UX Persistence** | User settings are saved across sessions | localStorage remembers the user's last visited page, audio volume, and selected music genre |
| **Multi-Lingual Support** | Full language support for four locales | react-i18next handles all translations (en, es, fr, de) and Next.js App Router manages localized URLs |

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (configured with custom CSS variables)
- **Animations:** framer-motion
- **Audio:** howler
- **I18n:** react-i18next
- **Testing:** Jest & React Testing Library
- **Images:** next/image (for optimization and performance)

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Add Audio Assets (Critical Step)

For the audio system to work, you must add royalty-free or CC0 licensed MP3 files to the corresponding folders:

| Folder Path | Required Files | Purpose |
|-------------|----------------|----------|
| `/public/audio/` | `page-flip.mp3` | Page transition sound effect |
| `/public/audio/classical/` | 3+ MP3 files (`track1.mp3`, `track2.mp3`, `track3.mp3`) | Classical music playlist |
| `/public/audio/jazz/` | 3+ MP3 files | Jazz music playlist |
| `/public/audio/piano/` | 3+ MP3 files | Piano music playlist |

**Recommended Sources:**
- [Free Music Archive](https://freemusicarchive.org/)
- [Incompetech](https://incompetech.com/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)

### 3. Run Development Server

```bash
npm run dev
```

The site will be available at [http://localhost:3000/en/home](http://localhost:3000/en/home)

### 4. Testing

```bash
# Run tests in watch mode
npm test

# Run tests once (used in CI)
npm run test:ci
```

## ⚙️ Configuration & Customization

### Theming

All colors and fonts are controlled via CSS Variables defined in `src/app/globals.css`. Modify the hex codes to instantly change the entire theme:

```css
@theme {
  --color-neon-cyan: #00ffff;
  --color-neon-gold: #ffd700;
  --color-sepia: #c9a868;
  /* ...more colors */
}
```

### Portfolio Data

Project entries are managed in `src/lib/projects.ts`. Edit the `portfolioProjects` array to add, remove, or modify project details:

```typescript
export const portfolioProjects: Project[] = [
  {
    id: '001',
    title: 'Your Project',
    description: 'Project description',
    technologies: ['React', 'TypeScript'],
    status: 'completed',
  },
  // Add more projects...
];
```

### Internationalization

Translations are stored in `src/i18n/locales/{locale}/common.json`. Add or modify translations for each supported language (en, es, fr, de).

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your Git repository to Vercel
2. The platform will auto-detect Next.js
3. Deploy with default settings

### Netlify

1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### GitHub Actions CI

The `.github/workflows/ci.yml` file is configured to run on every push or pull request:
- Runs `npm run lint`
- Runs `npm run test:ci`
- Runs `npm run build`

## 🎨 Component Architecture

### PageFlipContainer

The core 3D flip effect:

```typescript
const pageVariants = {
  animate: {
    rotateY: 0,
    transition: { duration: 0.55, ease: 'easeInOut' }
  }
};
```

Wraps content with `style={{ perspective: '1400px' }}` for proper 3D rendering.

### MascotFollower (Orbital Tracker)

Trigonometry-based mouse tracking:

```typescript
const angleRad = Math.atan2(deltaY, deltaX);
angleDeg.set(angleRad * (180 / Math.PI) + 90);
```

Uses Framer Motion's `useSpring` for smooth, physics-based movement.

### GlitchText

Character scrambling on hover with configurable elements:

```tsx
<GlitchText as="h1" className="text-neon-cyan">
  Your Text
</GlitchText>
```

## 📁 Project Structure

```
retro-futuristic-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   └── audio/
│       ├── classical/
│       ├── jazz/
│       └── piano/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   ├── contact/
│   │   │   └── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── AudioJukebox.tsx
│   │   ├── GlitchText.tsx
│   │   ├── MascotFollower.tsx
│   │   ├── Navigation.tsx
│   │   └── PageFlipContainer.tsx
│   ├── i18n/
│   │   ├── locales/
│   │   ├── client.ts
│   │   └── config.ts
│   ├── lib/
│   │   └── projects.ts
│   └── middleware.ts
├── jest.config.js
├── jest.setup.js
├── package.json
└── tsconfig.json
```

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Tips

1. **Performance:** The project uses Next.js's built-in image optimization. Place images in `/public` for best results.
2. **Accessibility:** All interactive elements have proper focus states and ARIA labels.
3. **Customization:** Start by modifying colors in `globals.css` and project data in `projects.ts`.
4. **Audio:** Remember to add actual audio files before deploying to production!

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Howler.js](https://howlerjs.com/)

---

**Built with 🎨 by developers, for developers**
