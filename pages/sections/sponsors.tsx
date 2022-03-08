import { motion } from 'framer-motion'
import { SponsorsGrid } from '@/components/Sponsors'

export default function Sponsors() {
  return (
    <section className='flex flex-col w-full h-full min-h-[60rem] max-w-[60rem] mb-20 justify-center items-center'>
      <h1 className='text-center'>Our Sponsors</h1>
      <p className='mb-12 text-center'>
        Thank you to all of those who made this hackathon possible.
      </p>
      <a target='_blank' rel='noreferrer noopener' href='/citrushack-2022-sponsorship-packet.pdf' className='mb-16'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.995 }}
          className='flex justify-center items-center self-center h-11 w-40 px-4 font-semibold text-lg rounded-md bg-highlight text-white cursor-pointer'
        >
          Sponsor Us
        </motion.button>
      </a>
      <SponsorsGrid />
    </section>
  )
}
