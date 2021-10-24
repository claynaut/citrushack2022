import React, { useState } from 'react'
import { Link as NavLink } from 'react-scroll'
import { motion } from 'framer-motion'
import {
  BiHomeAlt,
  BiInfoCircle,
  BiDirections,
  BiDonateHeart,
  BiDollarCircle,
  BiGroup,
  BiHelpCircle,
  BiMenu,
  BiX
} from 'react-icons/bi'


export default function Nav() {
  const [navOpen, setNavOpen] = useState(false)

  const tabs = [
    {
      icon: <BiHomeAlt />,
      title: 'Home'
    },
    {
      icon: <BiInfoCircle />,
      title: 'About'
    },
    {
      icon: <BiDirections />,
      title: 'Tracks'
    },
    {
      icon: <BiDonateHeart />,
      title: 'Support'
    },
    {
      icon: <BiDollarCircle />,
      title: 'Sponsors'
    },
    {
      icon: <BiGroup />,
      title: 'Staff'
    },
    {
      icon: <BiHelpCircle />,
      title: 'FAQ'
    },
  ]

  return (
    <>
      {/* desktop navbar */}
      <motion.div
        whileHover={{ width: 200 }}
        className='z-[100] fixed top-1/2 left-4 transform -translate-y-1/2 hidden xl:flex flex-col gap-2.5 w-14 p-2 rounded-md bg-gray-200 shadow'
      >
        {tabs.map(({icon, title}) =>
          <motion.span
            whileHover={{ scale: 1.05, x: 20 }}
            whileTap={{ scale: 0.995 }}
          >
            <NavLink 
              activeClass='bg-accent-primary text-white'
              to={title}
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              className='flex gap-2.5 items-center p-2 font-semibold text-lg truncate rounded-md hover:bg-accent-primary hover:text-white cursor-pointer'
            >
                <span className='text-2xl'>{icon}</span>
                <span>{title}</span>
            </NavLink>
          </motion.span>
        )}
      </motion.div>
      {/* mobile navbar */}
      <div className='z-[100] fixed top-4 xl:hidden px-4'>
        <div
          className={
            'flex flex-col gap-2.5 p-2 rounded-md bg-gray-200 shadow overflow-hidden transition-size duration-200 '
            + (navOpen ? 'w-48 h-[27.25rem]' : 'w-14 h-14')
          }
        >
          <div className='flex w-full justify-between'>
            <span
              className='flex gap-2.5 items-center p-2 w-20 max-w-min text-lg rounded-md hover:bg-accent-primary cursor-pointer'
              onClick={() => setNavOpen(!navOpen)}
            >
              { navOpen
                ? <BiX className='text-2xl' />
                : <BiMenu className='text-2xl' />
              }
            </span>
          </div>
          {tabs.map(({icon, title}) =>
            <NavLink 
              activeClass='bg-accent-primary text-white'
              to={title}
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              className='flex gap-2.5 items-center p-2 font-semibold text-lg rounded-md hover:bg-accent-primary hover:text-white cursor-pointer'
              onClick={() => setNavOpen(false)}
            >
              <span className='text-2xl'>{icon}</span>
              <span>{title}</span>
            </NavLink>
          )}
        </div>
      </div>
      <div
        className={
          'fixed top-0 left-0 w-full h-full bg-transparent transition-all duration-150 '
          + ( navOpen ? 'z-[90] visible' : 'z-0 invisible' )
        }
        onClick={() => setNavOpen(false)}
      />
    </>
  )
}