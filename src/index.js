import { App } from './app'
import { createRoot } from 'react-dom/client'
import { TimerProvider } from './context'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { ToastProvider } from 'react-toast-notifications'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter basename={ process.env.NODE_ENV === 'production' ? '/comms-time' : '' }>
    <ToastProvider placement="bottom-left">
      <TimerProvider>
        <ThemeProvider theme={ theme }>
          <App />
        </ThemeProvider>
      </TimerProvider>
    </ToastProvider>
  </BrowserRouter>
)
