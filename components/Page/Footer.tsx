import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  FiMail,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
} from 'react-icons/fi'
import vercel from '../../documentation/powered-by-vercel.svg'
import { Wave } from '../Wave'

export function Footer() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  const socials = [
    {
      icon: <FiMail title='Email' />,
      link: 'mailto:citrushack@gmail.com',
    },
    {
      icon: <FiFacebook title='Facebook' />,
      link: 'https://www.facebook.com/CitrusHack',
    },
    {
      icon: <FiInstagram title='Instagram' />,
      link: 'https://www.instagram.com/citrushack_ucr',
    },
    {
      icon: <FiTwitter title='Twitter' />,
      link: 'https://twitter.com/citrushack',
    },
    {
      icon: <FiLinkedin title='LinkedIn' />,
      link: 'https://www.linkedin.com/company/citrus-hack',
    },
  ]

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className='flex flex-col w-screen'>
      <Wave type={4} bgColor='bg-secondary' fillColor='primary'/>
      <footer className='flex justify-center w-full py-12 bg-primary'>
        <div className='flex flex-col gap-4 items-center w-full mx-4 text-md font-semibold'>
          <div className='flex gap-2.5 text-2xl'>
            { socials.map(({ icon, link }) =>
              <a key={link} target='_blank' rel='noreferrer noopener' href={link}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className='hover:text-highlight cursor-pointer'
                >
                  {icon}
                </motion.div>
              </a>
            )}
          </div>
          <p className='text-center'>
            Made with {theme === 'light' ? '🖤': '🤍'} by the Citrus Hack Team.
          </p>
          <a target='_blank' rel='noreferrer noopener' href='https://vercel.com/?utm_source=citrushack&utm_campaign=oss'>
            <Image
              src={vercel}
              height={40}
            />
          </a>
          <a className='text-sub-bright hover:underline' target='_blank' rel='noferrer noopener' href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'>MLH Code Of Conduct</a>
        </div>
      </footer>
    </div>
  )
}