# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2025-11-24

### Changed
- **Audio Control**: Removed localStorage persistence - audio now resets to muted on app restart
- **Audio Control**: Added click-outside detection to automatically close dropdown menu
- **Language Selector**: Added click-outside detection to automatically close dropdown menu
- **Default Behavior**: Application now resets to English language and muted audio on each session

### Technical Details
- Removed `localStorage.getItem/setItem` for audio preferences
- Added `useRef` and click-outside event listeners for both audio and language dropdowns
- Audio always starts muted (default: `isMuted = true`)
- Language always defaults to English via middleware (`defaultLocale = 'en'`)

### User Experience Improvements
- Cleaner session management - no persistent state between visits
- Better UX with automatic dropdown closing when clicking outside
- Consistent default experience for all users

## [1.0.0] - 2025-11-24

### Added
- Initial release of retro-futuristic portfolio
- Dual theme system (Futuristic & Retro)
- Multi-language support (EN, ES, FR, DE)
- Background music system with genre selection
- Responsive design for all devices
- Contact form with Web3Forms integration
- GitHub projects integration
- Secret game easter egg
- SEO optimization
- PWA ready
- Comprehensive documentation

### Technical Stack
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Three.js & React Three Fiber
- Framer Motion
- Jest for testing
- GitHub Actions CI/CD

### Documentation
- README.md with project overview
- SETUP_GUIDE.md for detailed setup
- DEPLOYMENT.md for deployment instructions
- CONTRIBUTING.md for contribution guidelines
- GITHUB_UPLOAD_CHECKLIST.md for upload steps
- PROJECT_STATUS.md for current status
- QUICK_START.md for quick reference
