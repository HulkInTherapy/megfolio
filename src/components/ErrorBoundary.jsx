"use client";

import React from 'react';
import Link from 'next/link';

/**
 * ErrorBoundary - Catches JavaScript errors anywhere in child component tree
 * Displays a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console (could also send to error reporting service)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h1 className="handwritten-lg">oops, something broke...</h1>
            <p className="handwritten" style={{ color: 'var(--pencil)', marginTop: '16px' }}>
              (the code gremlins struck again)
            </p>

            <div className="error-actions" style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleRetry}
                className="error-button"
                style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '1.2rem',
                  padding: '12px 24px',
                  background: 'var(--paper)',
                  border: '2px solid var(--ink)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                try again
              </button>

              <Link
                href="/"
                className="error-button"
                style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '1.2rem',
                  padding: '12px 24px',
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  border: '2px solid var(--ink)',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}
                onClick={this.handleRetry}
              >
                ← back to home
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '32px', textAlign: 'left', maxWidth: '600px' }}>
                <summary className="handwritten-sm" style={{ cursor: 'pointer', color: 'var(--pencil)' }}>
                  technical details (for debugging)
                </summary>
                <pre style={{
                  marginTop: '12px',
                  padding: '16px',
                  background: 'var(--paper-aged)',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>

          <style>{`
            .error-boundary {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 24px;
              background: var(--paper);
            }

            .error-content {
              max-width: 500px;
            }

            .error-button:hover {
              transform: translateY(-2px);
              box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
            }

            .error-button:focus-visible {
              outline: 2px solid var(--spark);
              outline-offset: 2px;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
