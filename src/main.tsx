import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
      ariaProps: { //Configuracao para acessibilidade
          role: 'status',
          'aria-live': 'polite',
        },
      }}
    />
    <App />
  </StrictMode>,
)
