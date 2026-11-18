import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { prepareMotion } from './motion'
import './styles.css'

prepareMotion()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
