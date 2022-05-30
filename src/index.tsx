import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'

import reportWebVitals from './reportWebVitals'
import ErrorFallback from './ErrorFallback'
import { AppRouter } from './AppRouter'
import { store } from './state/store'

import 'react-loading-skeleton/dist/skeleton.css'
import 'tailwindcss/dist/base.min.css'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log('reset')
      }}
    >
      <BrowserRouter>
        <ToastContainer
          position='bottom-right'
          hideProgressBar
          autoClose={5000}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          style={{ zIndex: 10000 }}
        />
        <AppRouter />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
