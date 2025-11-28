'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Don't trigger error boundary for MetaMask/extension errors
    const errorMessage = error.toString();
    const errorStack = error.stack || '';
    const combinedMessage = (errorMessage + ' ' + errorStack).toLowerCase();
    
    const suppressedPatterns = [
      'MetaMask',
      'Failed to connect to MetaMask',
      'i: Failed to connect to MetaMask',
      'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn',
      'nkbihfbeogaeaoehlefnkodbefgpgknn',
      'inpage.js',
      'Object.connect',
    ];
    
    const isSuppressed = suppressedPatterns.some(pattern =>
      combinedMessage.includes(pattern.toLowerCase())
    );

    if (isSuppressed) {
      // Return null to prevent error boundary from showing
      return { hasError: false, error: null };
    }

    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Ignore MetaMask and extension-related errors
    const errorMessage = error.toString();
    const errorStack = error.stack || '';
    const componentStack = errorInfo.componentStack || '';
    const combinedMessage = (errorMessage + ' ' + errorStack + ' ' + componentStack).toLowerCase();
    
    const suppressedPatterns = [
      'MetaMask',
      'Failed to connect to MetaMask',
      'i: Failed to connect to MetaMask',
      'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn',
      'nkbihfbeogaeaoehlefnkodbefgpgknn',
      'inpage.js',
      'Object.connect',
    ];
    
    const isSuppressed = suppressedPatterns.some(pattern =>
      combinedMessage.includes(pattern.toLowerCase())
    );

    if (!isSuppressed) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full border-2 border-neon-pink p-8 rounded-lg bg-bg-darker bg-opacity-50 text-center">
            <h1 className="text-4xl text-neon-pink font-mono mb-4">⚠️ SYSTEM ERROR</h1>
            <p className="text-text-secondary mb-6">
              Something went wrong. Please refresh the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-3 border-2 border-neon-cyan text-neon-cyan font-mono hover:bg-neon-cyan hover:text-bg-dark transition-all rounded-lg"
            >
              RELOAD PAGE
            </button>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-text-muted cursor-pointer font-mono text-sm">
                  Error Details
                </summary>
                <pre className="mt-2 text-xs text-text-muted overflow-auto bg-bg-dark p-4 rounded">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

