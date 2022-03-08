import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Element } from 'react-scroll'
import { useSession } from 'next-auth/react'
import { Page } from '@/components/Page'
import Modal from '@/components/Modal'
import Landing from '@/pages/sections/landing'
import About from '@/pages/sections/about'
import Tracks from '@/pages/sections/tracks'
import Support from '@/pages/sections/support'
import Sponsors from '@/pages/sections/sponsors'
import Staff from '@/pages/sections/staff'
import Faq from '@/pages/sections/faq'
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
      <Element name='Home' className='flex justify-center px-4 w-full bg-primary'>
        <Landing />
      </Element>
      <Wave bgColor='primary' fillColor='secondary'/>
      <Element name='About' className='flex justify-center px-4 w-full bg-secondary'>
        <About />
      </Element>
      <Wave type={2} bgColor='secondary' fillColor='primary'/>
      <Element name='Tracks' className='flex justify-center px-4 w-full bg-primary'>
        <Tracks />
      </Element>
      <Wave bgColor='primary' fillColor='accent'/>
      <Element name='Support' className='flex justify-center px-4 w-full bg-accent'>
        <Support />
      </Element>
      <Wave type={3} bgColor='accent' fillColor='accent-secondary'/>
      <Element name='Sponsors' className='flex justify-center px-4 w-full bg-accent-secondary'>
        <Sponsors />
      </Element>
      <Wave bgColor='accent-secondary' fillColor='primary'/>
      <Element name='Staff' className='flex justify-center px-4 w-full bg-primary'>
        <Staff />
      </Element>
      <Wave type={2} bgColor='primary' fillColor='secondary'/>
      <Element name='FAQ' className='flex justify-center px-4 w-full bg-secondary'>
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
            whileHover={{ scale: 1.03}} 
            whileTap={{ scale: 0.995 }}
            className='w-full py-1.5 rounded bg-highlight hover:bg-highlight-dark font-semibold text-white'
            onClick={() => setModalOpen(false)}
          >
            Apply Here
          </motion.button>
        </Link>
      </Modal>
    </Page>
  )
}