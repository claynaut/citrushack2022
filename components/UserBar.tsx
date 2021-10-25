import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  BiSun,
  BiMoon
} from 'react-icons/bi'


export default function ThemeButton() {
  const { theme, setTheme } = useTheme()
  const selectedTheme = useRef('light')

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
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.995 }}
      className='z-[100] fixed top-3 right-20 h-14 flex flex-col rounded-md bg-gray-200 shadow'
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.995 }}
        className='flex items-center self-center h-full px-6 max-w-min font-semibold text-lg rounded-md bg-accent-primary text-white cursor-pointer'
      >
        Apply
      </motion.button>
    </motion.div>
  )
}