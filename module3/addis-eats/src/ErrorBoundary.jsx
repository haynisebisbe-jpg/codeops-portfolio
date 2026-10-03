import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Component information:", info);
  }

  handleRetry = () => {
    this.setState({
      error: null
    });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>

          <p>
            This part of Addis Eats could not be displayed.
          </p>

          <button onClick={this.handleRetry}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;