import React from 'react';

type Props = { children: React.ReactNode; fallback?: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Send to monitoring if desired
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return <>{this.props.fallback}</>;
      return (
        <div role="alert" style={{ padding: 16 }}>
          <p>Something went wrong.</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error?.message ?? 'Unknown error'}
          </pre>
          <button onClick={this.handleReset}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}
