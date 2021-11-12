import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import Nav from '@/components/Nav'
import UserBar from '@/components/UserBar'
import Footer from '@/components/Footer'

import 'tailwindcss/tailwind.css'
import 'tailwind.source.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <ThemeProvider enableSystem={false}>
        <Toaster />
        <Nav />
        <UserBar/>
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  )
}
