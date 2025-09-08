"use client";

import React, { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Beautiful fallback UI using shadcn Card, Button, and Tailwind
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-400 to-blue-500 p-4">
          <div className="w-full max-w-md">
            <div className="rounded-xl border border-gray-200 bg-white shadow-xl p-8 flex flex-col items-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="mb-4 text-red-500"
                aria-hidden="true"
              >
                <title>Error icon</title>
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M12 8v4m0 4h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-700 mb-6">
                {this.state.error?.message.includes(
                  "Attempt to get default algod configuration",
                )
                  ? "Please make sure to set up your environment variables correctly. Create a .env file based on .env.template and fill in the required values. This controls the network and credentials for connections with Algod and Indexer."
                  : this.state.error?.message}
              </p>
              <Button
                type="button"
                className="inline-flex items-center rounded-md bg-teal-500 px-4 py-2 text-white font-medium shadow hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
