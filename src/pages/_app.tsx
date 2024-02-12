import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/auth/AuthContext'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <AuthProvider>
                <ToastContainer />
                <Header />
                <Component {...pageProps} />
                <Footer />
            </AuthProvider>
        </>
    )
}
