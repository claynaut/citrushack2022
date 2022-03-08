import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  BiSun,
  BiMoon,
  BiUser
} from 'react-icons/bi'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { ThemeButton } from './ThemeButton'
import { UserDropdown } from './UserDropdown'
import Modal from '@/components/Modal'
import { SigninForm } from '@/components/Form'

export function UserBar() {
  const { theme, setTheme } = useTheme()
  const selectedTheme = useRef('light')
  const router = useRouter()
  const { data: session, status } = useSession()
  const [signinModalOpen, setSigninModalOpen] = useState(false)

  const toggleSigninModal = () => {
    setSigninModalOpen(!signinModalOpen)
  }

  const toggleDarkMode = () => {
    var selected = theme === 'light' ? 'dark' : 'light'
    setTheme(selected)
    localStorage.setItem('theme', selected)
    selectedTheme.current = selected
  }

  useEffect(() =>{
    selectedTheme.current = localStorage.getItem('theme')
  }, [theme, selectedTheme])

  return (
    <>
      <div className='z-[100] fixed top-3 right-[5.25rem] md:right-32 flex gap-3'>
        { status === 'authenticated' && !session.user.uid && router.pathname !== '/apply' &&
          <Link passHref href='/apply'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.995 }}
              className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md shadow cursor-pointer'
            >
              Apply
            </motion.button>
          </Link>
        }
        { session ?
            <UserDropdown />
          :
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.995 }}
              className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-amber-500 shadow cursor-pointer'
              onClick={() => toggleSigninModal()}
            >
              Sign In
            </motion.button>
        }
        <span className='hidden md:block'>
          <ThemeButton />
        </span>
      </div>
      <Modal
        title='Sign In'
        description='Sign in to Citrus Hack via email or Google to apply and access more. No password required.'
        show={signinModalOpen}
        handler={setSigninModalOpen}
      >
        <SigninForm />
      </Modal>
    </>
  )
}