import { ThemeProvider } from 'next-themes'
import Nav from '@/components/Nav'
import UserBar from '@/components/UserBar'
import ThemeButton from '@/components/ThemeButton'
import Footer from '@/components/Footer'

import 'tailwindcss/tailwind.css'
import 'tailwind.source.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={false}>
      <Nav />
      <UserBar/>
      <ThemeButton />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}
