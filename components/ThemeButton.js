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
    <div
      className='z-[100] fixed top-3 right-3 flex flex-col p-2 rounded-md bg-gray-200 shadow'
    >
      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.995 }}
        className='flex items-center self-center p-2 max-w-min text-2xl rounded-md hover:bg-accent-primary cursor-pointer'
        onClick={() => toggleDarkMode()}
      >
        { theme === 'light' && <BiSun /> }
        { theme === 'dark' && <BiMoon /> }
      </motion.span>
    </div>
  )
}