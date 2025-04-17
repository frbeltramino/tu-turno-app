import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // ojo, usá 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './context/AuthProvider'
import { ToastProvider } from './context/ToastProvider'
import { AppointmentsProvider } from './context/AppointmentsProvider' // <- usá el Provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AppointmentsProvider> 
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </AppointmentsProvider>
    </ToastProvider>
  </StrictMode>
)