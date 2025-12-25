import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Toaster } from 'sonner'
import './styles/globals.css'

import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
            <Toaster position="top-center" richColors />
        </AuthProvider>
    </React.StrictMode>,
)
