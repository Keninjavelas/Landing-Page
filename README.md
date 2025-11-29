# 🚀 Retro-Futuristic Portfolio

> A modern, multilingual portfolio website featuring a unique dual-theme design: sleek futuristic interface and nostalgic 80s CRT monitor aesthetic.

**🌐 Live Demo:** [https://landing-page-sandy-alpha-26.vercel.app](https://landing-page-sandy-alpha-26.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](docs/CONTRIBUTING.md)

## ✨ Features

- **🎨 Dual Theme System** - Switch between futuristic neon and retro CRT aesthetics
- **🌍 Multilingual** - Full support for English, Spanish, French, and German
- **🎵 Background Music** - Optional ambient music with genre selection
- **📱 Responsive Design** - Optimized for all devices and screen sizes
- **🎯 Dynamic Projects** - Auto-synced with GitHub repositories
- **📧 Contact Form** - Functional form with Web3Forms integration
- **🎮 Easter Eggs** - Hidden interactive elements throughout
- **⚡ Performance** - SSR/SSG with optimized loading and caching

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js & React Three Fiber
- **Animations:** Framer Motion
- **Audio:** Howler.js
- **i18n:** next-intl
- **Testing:** Jest & React Testing Library

## 🚀 Quick Start

### Prerequisites

- Node.js 18.18.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Keninjavelas/Landing-Page.git
cd Landing-Page

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Web3Forms access key

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:ci      # Run tests in CI mode
npm run i18n:check   # Validate translations
```

## 📁 Project Structure

```
retro-futuristic-portfolio/
├── docs/                 # 📚 All documentation
├── public/               # Static assets
│   ├── audio/           # Background music files
│   └── Resume.pdf       # Your resume
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── [locale]/    # Internationalized routes
│   │   └── api/         # API routes
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── i18n/           # Internationalization
│   ├── lib/            # Utility functions
│   └── middleware.ts   # Routing middleware
└── .env.local          # Environment variables (create this)
```

## ⚙️ Configuration

### Environment Variables

Create `.env.local` in the root directory:

```env
# Required for contact form
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here

# Optional: GitHub token for higher API rate limits
GITHUB_TOKEN=your_github_token
```

Get your Web3Forms access key at [web3forms.com](https://web3forms.com/)

### Customization

1. **Personal Information**
   - Update `src/app/constants.ts` with your details
   - Edit translation files in `src/i18n/locales/`
   - Replace `public/Resume.pdf` with your resume

2. **GitHub Integration**
   - Update username in `src/lib/github.ts`
   - Projects will auto-sync from your repositories

3. **Audio Files** (Optional)
   - Add `jazz.mp3` and `piano.mp3` to `public/audio/`
   - See `public/audio/README.md` for details

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Keninjavelas/Landing-Page)

Or using CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Other Platforms

- **Netlify:** Connect your GitHub repository
- **Railway:** Run `railway up`
- **Docker:** See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

For detailed deployment instructions, see the [Deployment Guide](docs/DEPLOYMENT.md).

## 📚 Documentation

Complete documentation is available in the [`docs/`](docs/) folder:

- [Quick Start Guide](docs/QUICK_START.md) - Fast setup and common commands
- [Setup Guide](docs/SETUP_GUIDE.md) - Detailed installation instructions
- [Deployment Guide](docs/DEPLOYMENT.md) - Deploy to various platforms
- [Contributing Guide](docs/CONTRIBUTING.md) - How to contribute
- [Commands Reference](docs/COMMANDS.md) - All commands in one place
- [Changelog](docs/CHANGELOG.md) - Version history
- [Project Status](docs/PROJECT_STATUS.md) - Current project status

See the [Documentation Index](docs/README.md) for the complete list.

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Aryan Kapoor**  
Email: [aryankapoor0303@gmail.com](mailto:aryankapoor0303@gmail.com)  
GitHub: [@Keninjavelas](https://github.com/Keninjavelas)

---

<div align="center">
  <strong>Made with ❤️ and lots of ☕</strong>
</div>
