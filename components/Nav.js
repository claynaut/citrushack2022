import React, { useState, useEffect } from 'react'
import { Link as NavLink } from 'react-scroll'
import { motion } from 'framer-motion'
import {
  FaHome,
  FaInfoCircle,
  FaMapSigns,
  FaHandHoldingHeart,
  FaHandshake,
  FaUsers,
  FaQuestionCircle,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes
} from 'react-icons/fa'


export default function Nav() {
  const [darkMode, setDarkMode] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const toggleDarkMode = () => {
    if (localStorage.theme === 'dark') {
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    }
    else {
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
  }

  const tabs = [
    {
      icon: <FaHome />,
      title: "Home"
    },
    {
      icon: <FaInfoCircle />,
      title: "About"
    },
    {
      icon: <FaMapSigns />,
      title: "Tracks"
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Support"
    },
    {
      icon: <FaHandshake />,
      title: "Sponsors"
    },
    {
      icon: <FaUsers />,
      title: "Staff"
    },
    {
      icon: <FaQuestionCircle />,
      title: "FAQ"
    },
  ]

  useEffect(() => {
    setDarkMode(localStorage.getItem('theme') === 'dark')
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode, setDarkMode])

  return (
    <>
      {/* desktop navbar */}
      <motion.div
        whileHover={{ width: 200 }}
        className="z-100 fixed top-4 hidden xl:flex flex-col gap-2.5 w-16 p-2.5 rounded-md bg-gray-200 shadow"
      >
        {tabs.map(({icon, title}) =>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
          >
            <NavLink 
              activeClass="bg-accent-primary"
              to={title}
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              className="flex gap-2.5 items-center p-2.5 text-lg truncate rounded-md hover:bg-accent-primary cursor-pointer"
            >
                <span className="text-2xl">{icon}</span>
                <span>{title}</span>
            </NavLink>
          </motion.span>
        )}
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.995 }}
          className="flex gap-2.5 items-center self-center p-2.5 w-20 max-w-min text-lg truncate rounded-md hover:bg-accent-primary cursor-pointer"
          onClick={() => toggleDarkMode()}
        >
          { darkMode
            ? <FaMoon className="text-2xl" />
            : <FaSun className="text-2xl" />
          }
        </motion.span>
      </motion.div>
      {/* mobile navbar */}
      <div className="z-100 fixed top-4 xl:hidden w-full max-w-6xl px-4">
        <div
          className={
            "flex flex-col gap-2.5 w-full p-2.5 rounded-md bg-gray-200 truncate shadow "
            + (navOpen ? "max-h-min" : "max-h-16")
          }
        >
          <div className="flex w-full justify-between">
            <span
              className="flex gap-2.5 items-center p-2.5 w-20 max-w-min text-lg truncate rounded-md hover:bg-accent-primary cursor-pointer"
              onClick={() => setNavOpen(!navOpen)}
            >
              { navOpen
                ? <FaTimes className="text-2xl" />
                : <FaBars className="text-2xl" />
              }
            </span>
            <span
              className="flex gap-2.5 items-center p-2.5 w-20 max-w-min text-lg truncate rounded-md hover:bg-accent-primary cursor-pointer"
              onClick={() => toggleDarkMode()}
            >
              { darkMode
                ? <FaMoon className="text-2xl" />
                : <FaSun className="text-2xl" />
              }
            </span>
          </div>
          {tabs.map(({icon, title}) =>
            <NavLink 
              activeClass="bg-accent-primary"
              to={title}
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              className="flex gap-2.5 items-center p-2.5 text-lg truncate rounded-md hover:bg-accent-primary cursor-pointer"
              onClick={() => setNavOpen(false)}
            >
              <span className="text-2xl">{icon}</span>
              <span>{title}</span>
            </NavLink>
          )}
        </div>
      </div>
      <div
        className={
          "fixed top-0 left-0 w-full h-full bg-transparent transition-all duration-150 "
          + ( navOpen ? "z-90 visible" : "z-0 invisible" )
        }
        onClick={() => setNavOpen(false)}
      />
    </>
  )
}