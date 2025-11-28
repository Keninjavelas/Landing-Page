'use client';

import { useState } from 'react';

export default function ResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // In a real implementation, you would fetch the resume PDF
      // For now, we'll simulate a download
      const link = document.createElement('a');
      link.href = '/Resume.pdf'; // Resume PDF in /public/Resume.pdf
      link.download = `Aryan_Kapoor_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download resume. Please contact me directly.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neon-gold bg-transparent hover:bg-neon-gold hover:bg-opacity-10 transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Download resume"
    >
      <span className="text-xl">{isDownloading ? '⏳' : '📄'}</span>
      <span className="text-neon-gold font-mono text-sm md:text-base">
        {isDownloading ? 'DOWNLOADING...' : 'DOWNLOAD RESUME'}
      </span>
    </button>
  );
}

