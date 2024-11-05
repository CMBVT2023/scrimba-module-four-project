import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NavigationPage } from './NavigationPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavigationPage />
  </StrictMode>,
)
