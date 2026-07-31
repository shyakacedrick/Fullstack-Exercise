import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

const ErrorFallback = ({ error }) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Something went wrong.</h2>

      <p>{error.message}</p>

      <p>Please refresh the page or try again later.</p>
    </div>
  )
}

const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary