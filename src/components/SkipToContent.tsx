export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-neon-cyan focus:text-bg-dark focus:font-mono focus:font-bold focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan"
    >
      Skip to main content
    </a>
  );
}

