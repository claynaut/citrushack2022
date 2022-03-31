import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import safeStringify from 'fast-safe-stringify'
import { Toaster } from 'react-hot-toast'
import { Nav, Footer } from '@/components/Page'
import { UserBar } from '@/components/UserBar'
import { MLHBanner } from '@/components/MLHBanner'

import 'tailwindcss/tailwind.css'
import 'tailwind.source.css'

function localStorageProvider() {
  let map = new Map()
  if (typeof window !== 'undefined') {
    // When initializing, we restore the data from `localStorage` into a map.
    map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))
    // console.log(map)
  
    // Before unloading the app, we write back all the data into `localStorage`.
    window.addEventListener('beforeunload', () => {
      const appCache = safeStringify(Array.from(map.entries()))
      localStorage.setItem('app-cache', appCache)
    })
  }
  // We still use the map for write & read for performance.
  return map
}

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <SWRConfig value={{ provider: localStorageProvider }}>
        <ThemeProvider enableSystem={false}>
          <MLHBanner />
          <Toaster />
          <Nav />
          <UserBar/>
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
