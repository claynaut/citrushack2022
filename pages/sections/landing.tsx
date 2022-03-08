import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { CountdownWrapper } from '@/components/Countdown'

export default function Landing() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <section className='relative flex flex-col w-full h-screen md:min-h-[60rem] max-w-[72rem] justify-center mb-20 md:mb-0'>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5
        }}
        className='self-end w-5/12 xl:w-1/2 hidden lg:block transform-gpu'
      >
        <Image
          src={theme == 'light' ? '/assets/island-light.svg' : '/assets/island-dark.svg'}
          width={ 1712.57}
          height={1734.07}
          quality={50}
          priority={Boolean(true)}
          objectFit='contain'
        />
      </motion.div>
      <div className='absolute flex flex-col left-0'>
        <div className='flex flex-col max-w-xl'>
          <div className='flex flex-col sm:flex-row items-center text-center sm:text-left sm:mb-10'>
            <Image
              src={'/assets/logo.svg'}
              width={150}
              height={150}
              objectFit='contain'
            />
            <div>
              <h1>Citrus Hack</h1>
              <h3>April 2-3, 2022</h3>
            </div>
          </div>
          <h3 className='text-center sm:text-left font-semibold'>
            Grow your potential in...
          </h3>
        </div>
        <CountdownWrapper date='2022-04-02T09:00:00' />
      </div>
    </section>
  )
}