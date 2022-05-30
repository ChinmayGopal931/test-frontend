import React from 'react'

function ErrorFallback(error: any, resetErrorBoundary: any) {
  return (
    <div style={{ padding: 15 }}>
      <div>Sorry, something went wrong. Please try to reload:</div>
    </div>
  )
}

export default ErrorFallback
