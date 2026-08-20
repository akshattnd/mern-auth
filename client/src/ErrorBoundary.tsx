import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary:", error, errorInfo);

    // Send error to your monitoring service here
    // e.g. Sentry, LogRocket, etc.
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="max-w-md text-gray-600">
            An unexpected error occurred. Please try again.
          </p>

          <button
            onClick={this.handleRetry}
            className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}