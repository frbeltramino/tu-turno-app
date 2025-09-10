import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './context/AuthProvider'
import { ToastProvider } from './context/ToastProvider'
import { AppointmentsProvider } from './context/AppointmentsProvider'
import { LanguageProvider } from "./context/LanguageProvider";
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AppointmentsProvider> 
        <LanguageProvider>
          <AuthProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </AppointmentsProvider>
    </ToastProvider>
  </StrictMode>
)