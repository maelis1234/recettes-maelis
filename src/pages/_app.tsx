import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ToastContainer />
            <Component {...pageProps} />
        </>
    )
}
