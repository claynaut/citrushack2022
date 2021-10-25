import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  BiSun,
  BiMoon
} from 'react-icons/bi'


export default function ThemeButton() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.995 }}
      className='z-[100] fixed top-3 right-3 flex flex-col justify-center items-center w-12 h-12 rounded-md bg-gray-200 shadow text-2xl rounded-md hover:bg-accent-primary hover:text-white cursor-pointer'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      { theme === 'light' ? <BiSun /> : <BiMoon /> }
    </motion.button>
  )
}