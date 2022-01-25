import Link from 'next/link'
import { motion } from 'framer-motion'
import { Page } from '@/components/Page'

export default function Error404() {
  return (
    <Page title='404'>
      <section className='flex w-full my-24 justify-center items-center text-center'>
        <div>
          <h1>404</h1>
          <p className='mb-10'>
            The page you&apos;re looking for does not exist.
          </p>
          <Link passHref href='/'>
            <motion.button
              whileHover={{ scale: 1.03}} 
              whileTap={{ scale: 0.995 }}
              className='w-full max-w-lg py-1.5 rounded bg-accent-primary hover:bg-accent-primary-dark font-semibold text-white'
            >
              Go Back to Homepage
            </motion.button>
          </Link>
        </div>
      </section>
    </Page>
  )
}