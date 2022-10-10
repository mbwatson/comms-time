import { App } from './app'
import { createRoot } from 'react-dom/client'
import { TimerProvider } from './context'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <TimerProvider>
      <App />
    </TimerProvider>
  </BrowserRouter>
)
