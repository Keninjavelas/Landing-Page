'use client';

import { useEffect, useState } from 'react';

/**
 * Suppresses errors from browser extensions (like MetaMask)
 * that try to inject into the page
 */
export default function SuppressExtensionErrors() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    // List of error patterns to suppress
  const suppressedPatterns: string[] = [
      'MetaMask',
      'Failed to connect to MetaMask',
      'i: Failed to connect to MetaMask', // Specific error format
      'ethereum',
      'wallet',
      'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn', // MetaMask extension ID
      'nkbihfbeogaeaoehlefnkodbefgpgknn', // Extension ID without full path
      'inpage.js',
      'Object.connect', // MetaMask connection method
    ];

    const isSuppressedError = (error: unknown): boolean => {
      if (!error) return false;
      
      // Build comprehensive error string from all possible properties
      const errorString = (() => {
        if (typeof error === 'string') return error.toLowerCase();
        if (error instanceof Error) return (error.message || error.stack || error.name || '').toLowerCase();
        try {
          return JSON.stringify(error).toLowerCase();
        } catch {
          return '';
        }
      })();
      
      // Also check the error stack trace
      const stackString = error instanceof Error && typeof error.stack === 'string' ? error.stack.toLowerCase() : '';
      
      return suppressedPatterns.some(pattern => 
        errorString.includes(pattern.toLowerCase()) ||
        stackString.includes(pattern.toLowerCase())
      );
    };

    // Suppress console errors
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      try {
        if (!isSuppressedError(args[0])) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          originalConsoleError.apply(console, args as never);
        }
      } catch {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        originalConsoleError.apply(console, args as never);
      }
    };

    // Catch unhandled errors (including extension errors)
    const handleError = (event: ErrorEvent) => {
      const errorToCheck = event.error || event.message || event.filename || '';
      const filename = event.filename || '';
      
      // Check error, message, filename, and stack
      if (
        isSuppressedError(errorToCheck) || 
        isSuppressedError(event.message) ||
        filename.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
        filename.includes('inpage.js')
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
    };

    // Catch unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (isSuppressedError(event.reason)) {
        event.preventDefault();
        return false;
      }
    };

    // Add event listeners with capture phase to catch early
    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleRejection, true);
    
    // Also listen to React error overlay if it exists
    if (typeof window !== 'undefined') {
      const w = window as unknown as { __REACT_ERROR_OVERLAY_GLOBAL_HANDLER__?: (error: unknown) => void };
      if (w.__REACT_ERROR_OVERLAY_GLOBAL_HANDLER__) {
        const originalHandler = w.__REACT_ERROR_OVERLAY_GLOBAL_HANDLER__;
        w.__REACT_ERROR_OVERLAY_GLOBAL_HANDLER__ = (error: unknown) => {
          if (!isSuppressedError(error)) {
            originalHandler(error);
          }
        };
      }
    }

    // Cleanup on unmount
    return () => {
      console.error = originalConsoleError;
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleRejection, true);
    };
  }, [mounted]);

  return null;
}

