# 📋 Pre-Push Checklist

Before pushing to GitHub, ensure all items are checked:

## ✅ Code Quality

- [ ] All files saved
- [ ] No console.log statements (except intentional logging)
- [ ] No commented-out code blocks
- [ ] No TODO comments (or tracked in issues)
- [ ] No hardcoded credentials or API keys
- [ ] `.env.local` is in `.gitignore`

## ✅ Build & Tests

```bash
# Run these commands and ensure they pass:
npm run lint          # ✅ No linting errors
npm run build         # ✅ Build successful
npm test              # ✅ All tests pass
```

- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` completes successfully
- [ ] `npm test` all tests pass
- [ ] No TypeScript errors
- [ ] No console warnings in browser

## ✅ Environment & Configuration

- [ ] `.env.example` exists and is up to date
- [ ] `.env.local` is NOT committed
- [ ] `.gitignore` includes all necessary files
- [ ] `.gitattributes` is configured
- [ ] `package.json` version is correct

## ✅ Documentation

- [ ] README.md is complete and accurate
- [ ] All links in README work
- [ ] CHANGELOG.md is updated
- [ ] API documentation is current
- [ ] Comments are clear and helpful

## ✅ Git Hygiene

- [ ] Commit messages are clear and descriptive
- [ ] No large binary files committed
- [ ] No `node_modules/` committed
- [ ] No `.next/` or build artifacts committed
- [ ] No IDE-specific files (`.vscode/`, `.idea/`)

## ✅ Security

- [ ] No API keys in code
- [ ] No passwords in code
- [ ] No personal information exposed
- [ ] Dependencies are up to date
- [ ] No known security vulnerabilities

## ✅ Performance

- [ ] Images are optimized
- [ ] No unnecessary dependencies
- [ ] Bundle size is reasonable
- [ ] Lazy loading implemented where appropriate

## ✅ Accessibility

- [ ] All images have alt text
- [ ] Proper heading hierarchy
- [ ] Keyboard navigation works
- [ ] Color contrast is sufficient
- [ ] ARIA labels where needed

## ✅ Browser Testing

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Mobile responsive

## ✅ Final Checks

```bash
# Clean build
rm -rf .next node_modules
npm install
npm run build

# Verify git status
git status

# Check what will be committed
git diff --cached
```

- [ ] Clean build successful
- [ ] Only intended files are staged
- [ ] Commit message follows convention
- [ ] Branch is up to date with main

## 🚀 Ready to Push!

If all items are checked, you're ready to push:

```bash
git push origin your-branch-name
```

## 📝 Post-Push

After pushing:
- [ ] Create pull request if needed
- [ ] Verify CI/CD pipeline passes
- [ ] Check deployment preview
- [ ] Test deployed version

---

**Remember:** Quality over speed. Take time to review your changes!
