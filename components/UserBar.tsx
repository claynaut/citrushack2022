import React, { useEffect, useRef } from 'react'
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
import ThemeButton from '@/components/ThemeButton'
import UserDropdown from '@/components/UserDropdown'

export default function UserBar() {
  const { theme, setTheme } = useTheme()
  const selectedTheme = useRef('light')
  const router = useRouter()
  const { data: session } = useSession()

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
    <div className='z-[100] fixed top-3 right-3 flex gap-3'>
      { session && !session.user.uid && router.pathname !== '/apply' &&
        <Link passHref href='/apply'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-accent-primary text-white cursor-pointer'
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
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-accent-primary text-white cursor-pointer'
            onClick={() => signIn()}
          >
            Sign In
          </motion.button>
      }
      <ThemeButton />
    </div>
  )
}