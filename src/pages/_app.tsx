import 'tailwindcss/tailwind.css'

import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp

