import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { changeTheme } from './components/modules/ColorScheme/ColorScheme.tsx';

function setStorageColorScheme() {
    const theme = localStorage["theme"]
    if (typeof theme == "string" && theme !== "system") {
        changeTheme(localStorage["theme"])
    } else {
        changeTheme("system")
    }
}

setStorageColorScheme()
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)