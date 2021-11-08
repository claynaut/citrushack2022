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

export default function UserBar() {
  const { theme, setTheme } = useTheme()
  const selectedTheme = useRef('light')
  const router = useRouter()

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
      { router.pathname !== '/apply' &&
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.995 }}
          className='z-[100] fixed top-3 right-[4.5rem] h-12 flex flex-col rounded-md bg-gray-200 shadow'
        >
          <Link passHref href='/apply'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.995 }}
              className='flex items-center self-center h-full px-6 max-w-min font-semibold text-lg rounded-md bg-accent-primary text-white cursor-pointer'
            >
              Apply
            </motion.button>
          </Link>
        </motion.div>
      }
    </>
  )
}