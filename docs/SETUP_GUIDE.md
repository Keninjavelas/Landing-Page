# Setup Guide

Complete guide for configuring and customizing your portfolio.

## 📧 Contact Form Setup

### Using Web3Forms (Recommended)

1. Sign up at [web3forms.com](https://web3forms.com)
2. Get your access key
3. Add to `.env.local`:
   ```env
   WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
4. Deploy your site and verify domain in Web3Forms dashboard
5. Test the contact form

**Note**: Email sending requires a verified domain. During development, submissions are logged to console.

## 🎵 Background Music Setup

### Adding Audio Files

1. Place MP3 files in `public/audio/`:
   - `jazz.mp3`
   - `piano.mp3`

2. Restart your dev server

### Audio Requirements
- Format: MP3 (MPEG Audio Layer 3)
- Bitrate: 128-192 kbps recommended
- Sample Rate: 44.1 kHz or 48 kHz
- File size: Under 10MB per track

### Recommended Sources
- [Incompetech](https://incompetech.com/)
- [Free Music Archive](https://freemusicarchive.org/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)

## 🔗 GitHub Integration

### Fetching Projects from GitHub

The portfolio automatically fetches your public repositories.

1. Update GitHub username in `src/lib/github.ts`:
   ```typescript
   const GITHUB_USERNAME = 'your-github-username';
   ```

2. Projects are cached for 1 hour
3. Starred repos are prioritized

### Manual Project Configuration

Edit `src/lib/projects.ts` to manually configure projects if needed.

## 🌍 Domain Configuration

Replace `landing-page-sandy-alpha-26.vercel.app` with your custom domain if you have one:

```bash
# Find and replace in these files:
src/app/[locale]/layout.tsx
src/app/sitemap.ts
src/app/constants.ts
src/lib/structured-data.ts
public/robots.txt
```

## 📄 Resume Setup

1. Create your resume as a PDF
2. Name it `Resume.pdf` (capital R)
3. Place in `public/` folder
4. The download button will work automatically

## 🎨 Theme Customization

### Colors

Edit CSS variables in `src/app/globals-minimal.css`:

**Futuristic Theme:**
```css
:root {
  --color-neon-cyan: #4dd0e1;
  --color-neon-gold: #ffd54f;
  --color-neon-pink: #f06292;
  --color-neon-green: #81c784;
}
```

**Retro Theme:**
```css
[data-theme="retro"] {
  --color-neon-cyan: #ff6600;
  --color-neon-gold: #ffa500;
  /* ... */
}
```

### Fonts

Update in `tailwind.config.js`:
```javascript
fontFamily: {
  'retro': ['VT323', 'monospace'],
  'future': ['Orbitron', 'sans-serif'],
}
```

## 🌐 Internationalization

### Adding New Languages

1. Create translation file:
   ```
   src/i18n/locales/{locale}/common.json
   ```

2. Add locale to config:
   ```typescript
   // src/i18n/config.ts
   export const locales = ['en', 'es', 'fr', 'de', 'your-locale'];
   ```

3. Translate all keys in `common.json`

### Translation Keys

All translatable text uses the `t()` function:
```typescript
{t('home.title')}
```

## 🚀 Performance Optimization

### Disable Heavy Features

In `.env.local`:
```env
NEXT_PUBLIC_ENABLE_3D_MASCOTS=false
```

### Image Optimization

- Use Next.js Image component
- Provide width and height
- Use WebP format when possible

## 🔧 Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Audio Not Playing

1. Check files exist in `public/audio/`
2. Verify file format (MP3)
3. Restart dev server
4. Check browser console for errors

### Contact Form Not Working

1. Verify Web3Forms access key in `.env.local`
2. Check domain is verified in Web3Forms dashboard
3. Check browser console for API errors

### Translation Not Working

1. Verify translation files exist for all locales
2. Check translation keys match in all files
3. Restart dev server

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: aryankapoor0303@gmail.com

---

Happy coding! 🎉
