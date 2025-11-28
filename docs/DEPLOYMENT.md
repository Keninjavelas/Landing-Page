# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/retro-futuristic-portfolio)

### Manual Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables

Set these in your Vercel dashboard or `.env.local`:

```env
# Contact Form (Web3Forms)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here

# Optional: GitHub API Token (for higher rate limits)
GITHUB_TOKEN=your_github_token_here
```

## Post-Deployment Steps

### 1. Update Domain References
After deployment, update these files with your actual domain:

- `README.md` - Update repository URL
- `package.json` - Update repository URL
- `src/app/constants.ts` - Update SITE_URL
- `public/robots.txt` - Update sitemap URL

### 2. Configure Web3Forms
1. Go to [Web3Forms Dashboard](https://web3forms.com/dashboard)
2. Add your Vercel domain to allowed domains
3. Verify your domain
4. Test the contact form

### 3. Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)

## Deploy to Other Platforms

### Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   Add the same variables as Vercel

### Railway

1. **Deploy**
   ```bash
   npm i -g @railway/cli
   railway login
   railway init
   railway up
   ```

2. **Environment Variables**
   ```bash
   railway variables set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key
   ```

### Docker

1. **Build Image**
   ```bash
   docker build -t retro-portfolio .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 retro-portfolio
   ```

## Performance Optimization

### After Deployment
- Enable Vercel Analytics
- Configure caching headers
- Enable compression
- Monitor Core Web Vitals

### Recommended Settings
- Node.js version: 20.x
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`

## Troubleshooting

### Build Fails
- Check Node.js version (requires >=18.18.0)
- Verify all dependencies are installed
- Check environment variables are set
- Review build logs for errors

### Contact Form Not Working
- Verify Web3Forms access key is set
- Check domain is added to Web3Forms dashboard
- Ensure domain is verified
- Test with browser console open

### Audio Not Playing
- Ensure MP3 files are in `/public/audio/`
- Check file paths match exactly
- Verify files are committed to repository
- Test in different browsers

## Monitoring

### Vercel Analytics
- Automatically enabled on Vercel
- View in Vercel Dashboard → Analytics

### Custom Analytics
Add your analytics code to `src/app/[locale]/layout.tsx`:
```typescript
// Google Analytics, Plausible, etc.
```

## Continuous Deployment

GitHub Actions automatically:
- Runs tests on push
- Lints code
- Builds project
- Deploys to Vercel (if configured)

See `.github/workflows/ci.yml` for details.

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- Open an issue on GitHub
