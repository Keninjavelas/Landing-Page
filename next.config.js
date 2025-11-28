/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Production optimizations
  compress: true,
  
  // Set the correct workspace root to avoid lockfile warnings
  outputFileTracingRoot: __dirname,
  
  // Image optimization
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'three', 'framer-motion'],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Development optimizations
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Headers for audio files
  async headers() {
    return [
      {
        source: '/audio/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'audio/mpeg',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Client-side fallbacks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: 'three',
              priority: 10,
            },
            framer: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: 'framer-motion',
              priority: 9,
            },
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'commons',
              priority: 5,
              minChunks: 2,
            },
          },
        },
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;