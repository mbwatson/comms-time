import { App } from './app'
import { createRoot } from 'react-dom/client'
import { TimerProvider } from './context'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <TimerProvider>
      <ThemeProvider theme={ theme }>
        <App />
      </ThemeProvider>
    </TimerProvider>
  </BrowserRouter>
)
