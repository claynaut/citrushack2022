import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Element } from 'react-scroll'
import { useSession } from 'next-auth/react'
import { Page } from '@/components/Page'
import Modal from '@/components/Modal'
import {
  Landing,
  About,
  Tracks,
  Support,
  Sponsors,
  Staff,
  Faq,
  Schedule
} from '@/pages/sections'
import { Wave } from '@/components/Wave'

export default function Home() {
  const { data: session, status } = useSession()
  const [modalOpen, setModalOpen] = useState(status === 'authenticated' && !session.user.uid)

  useEffect(() => {
    if (status === 'authenticated') 
      setModalOpen(!session.user.uid)
  }, [session, status, setModalOpen])

  return (
    <Page>
      <Element name='Home' className='flex justify-center px-4 w-full bg-gradient-to-b from-primary to-accent'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain'>
          <Landing />
        </span>
      </Element>
      <Wave type={3} bgColor='bg-accent' fillColor='accent-secondary'/>
      <Element name='About' className='relative flex justify-center px-4 w-full bg-gradient-to-b from-accent-secondary to-accent'>
        <Schedule />
      </Element>
      <Wave bgColor='bg-accent' fillColor='primary'/>
      <Element name='About' className='relative flex justify-center px-4 w-full bg-gradient-to-b from-primary to-secondary'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain 2xl:bg-cover'>
          <About />
        </span>
      </Element>
      <Wave type={2} bgColor='secondary' fillColor='primary'/>
      <Element name='Tracks' className='flex justify-center px-4 w-full bg-primary'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain 2xl:bg-cover'>
          <Tracks />
        </span>
      </Element>
      <Wave bgColor='bg-primary' fillColor='accent'/>
      <Element name='Support' className='flex justify-center px-4 w-full bg-gradient-to-b from-accent to-card'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain 2xl:bg-cover'>
          <Support />
        </span>
      </Element>
      <Wave type={3} bgColor='bg-card' fillColor='accent-secondary'/>
      <Element name='Sponsors' className='flex justify-center px-4 w-full bg-gradient-to-b from-accent-secondary to-accent'>
        <Sponsors />
      </Element>
      <Wave bgColor='bg-accent' fillColor='primary'/>
      <Element name='Staff' className='flex justify-center px-4 w-full bg-primary'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain 2xl:bg-cover'>
          <Staff />
        </span>
      </Element>
      <Wave type={2} bgColor='bg-primary' fillColor='secondary'/>
      <Element name='FAQ' className='flex justify-center px-4 w-full bg-gradient-to-b'>
        <Faq />
      </Element>
      <Modal
        title='Apply for Citrus Hack 2022'
        description='It looks like you haven&apos;t applied to Citrus Hack yet! Be sure to apply before time runs out.'
        show={modalOpen}
        handler={setModalOpen}
      >
        <Link passHref href='/apply'>
          <motion.button
            whileHover={{ scale: 1.05}} 
            whileTap={{ scale: 0.995 }}
            className='w-full py-1.5 rounded bg-highlight hover:bg-highlight-dark font-semibold'
            onClick={() => setModalOpen(false)}
          >
            Apply Here
          </motion.button>
        </Link>
      </Modal>
    </Page>
  )
}