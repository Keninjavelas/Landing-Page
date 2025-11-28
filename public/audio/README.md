# Audio Files

Background music feature for the portfolio.

## Current Setup
Audio files are located directly in `/public/audio/`:
- **Classical**: `/audio/classical.mp3`
- **Jazz**: `/audio/jazz.mp3`
- **Piano**: `/audio/piano.mp3`

## How to Add Your Music

1. Replace the MP3 files in `/public/audio/` with your own:
   - Classical music → `/public/audio/classical.mp3`
   - Jazz music → `/public/audio/jazz.mp3`
   - Piano music → `/public/audio/piano.mp3`

2. Restart your dev server after adding new files

## Recommended Sources for Royalty-Free Music
- [Incompetech](https://incompetech.com/) - Kevin MacLeod's music
- [Free Music Archive](https://freemusicarchive.org/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Bensound](https://www.bensound.com/)
- [Scott Buckley](https://www.scottbuckley.com.au/) - Cinematic music

## File Requirements
- **Format**: MP3 (MPEG Audio Layer 3)
- **Codec**: Use standard MP3 encoding (not AAC or other codecs in MP3 container)
- **Bitrate**: 128-192 kbps recommended
- **Sample Rate**: 44.1 kHz or 48 kHz
- **File size**: Keep under 10MB per track for optimal loading
- **Browser compatibility**: Test in Chrome, Firefox, and Safari

## Converting Audio Files
If your audio files don't work, try converting them:

```bash
# Using ffmpeg (if installed)
ffmpeg -i input.mp3 -codec:a libmp3lame -b:a 192k -ar 44100 output.mp3
```

Or use online converters:
- [CloudConvert](https://cloudconvert.com/mp3-converter)
- [Online Audio Converter](https://online-audio-converter.com/)

## Troubleshooting
- **"Format error"**: File might be corrupted or use unsupported codec
- **Files not loading**: Restart dev server after adding new files
- **No sound**: Check browser console for errors, ensure files are valid MP3s

## How It Works
The audio control in the navigation bar allows users to:
1. Switch between Classical, Jazz, and Piano genres
2. Mute/Unmute the music
3. Music loops automatically for each genre
4. Preferences are saved in localStorage
