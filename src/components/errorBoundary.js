import React from "react";

class ErrorBoundary extends React.Component {
    state = { hasError: false, errorMessage: "" };

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, errorInfo) {
        console.error("에러 정보:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>에러 발생: {this.state.errorMessage}</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
