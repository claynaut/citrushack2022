import { motion } from 'framer-motion'

export default function Sponsors() {
  return (
    <section className='flex flex-col w-full h-screen max-w-[60rem] justify-center items-center'>
      <h1 className='mb-16'>Our Sponsors</h1>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.995 }}
        className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-amber-500 text-white cursor-pointer'
      >
        Sponsor Us
      </motion.button>
    </section>
  )
}
