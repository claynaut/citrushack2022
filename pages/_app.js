import Nav from '../components/Nav'
import Footer from '../components/Footer'

import 'tailwindcss/tailwind.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen w-full dark:bg-gray-500">
        <div className="w-full max-w-6xl">
          <Nav />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  )
}
