# 🚀 Quick Command Reference

## Git Commands

### Initial Setup
```bash
# Initialize git (if not done)
git init

# Stage all files
git add .

# Commit
git commit -m "feat: Complete portfolio v1.0.1"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/retro-futuristic-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Daily Workflow
```bash
# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "your message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

## Development Commands

### Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

### Development
```bash
# Start dev server
npm run dev

# Open browser
# http://localhost:3000
```

### Testing
```bash
# Run linter
npm run lint

# Run tests
npm test

# Run tests in CI mode
npm run test:ci

# Check translations
npm run i18n:check
```

### Build
```bash
# Build for production
npm run build

# Start production server
npm run start

# Clean build
rm -rf .next node_modules
npm install
npm run build
```

## Deployment Commands

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Docker
```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 portfolio
```

## Maintenance Commands

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name

# Install latest versions
npm install package-name@latest
```

### Clean Up
```bash
# Remove build artifacts
rm -rf .next

# Remove node_modules
rm -rf node_modules

# Remove lock file
rm package-lock.json

# Fresh install
npm install
```

## Useful Git Commands

### Branch Management
```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# List branches
git branch

# Delete branch
git branch -d feature/old-feature
```

### Undo Changes
```bash
# Discard changes in file
git restore filename

# Unstage file
git restore --staged filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### View History
```bash
# View commit history
git log

# View compact history
git log --oneline

# View changes
git diff

# View staged changes
git diff --cached
```

## Quick Checks

### Before Committing
```bash
npm run lint && npm run build && npm test
```

### Before Pushing
```bash
git status
git diff --cached
```

### After Deployment
```bash
# Check if site is live
curl -I https://your-domain.com

# Check build logs
vercel logs
```

## Environment Variables

### Local Development
```bash
# Edit .env.local
nano .env.local

# Or use your editor
code .env.local
```

### Vercel
```bash
# Set environment variable
vercel env add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

# List environment variables
vercel env ls

# Pull environment variables
vercel env pull
```

## Troubleshooting Commands

### Clear Everything
```bash
# Nuclear option - start fresh
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Check for Issues
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

### Debug Build
```bash
# Build with verbose output
npm run build -- --debug

# Check TypeScript errors
npx tsc --noEmit

# Check for unused dependencies
npx depcheck
```

## Quick Links

- **GitHub:** https://github.com/YOUR_USERNAME/retro-futuristic-portfolio
- **Vercel:** https://vercel.com/dashboard
- **Web3Forms:** https://web3forms.com/dashboard
- **Local Dev:** http://localhost:3000

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
rm -rf .next
npm run build
```

---

**Tip:** Bookmark this file for quick reference! 📌
