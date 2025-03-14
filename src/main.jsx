import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './context/AuthProvider'
import { LoaderScreen } from './components/LoaderScreen'




createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </AuthProvider>
)
