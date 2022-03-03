import React, { useState } from 'react'
import { Link as NavLink } from 'react-scroll'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
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
import { ThemeButton } from '@/components/UserBar/ThemeButton'

export function Nav() {
  const [navOpen, setNavOpen] = useState(false)
  const router = useRouter()
  const hometabs = [
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
  const applytabs = [
    {
      icon: <BiHomeAlt />,
      title: 'Home'
    },
  ]

  return (
    <>
      {/* desktop navbar */}
      <motion.div
        whileHover={{ width: 200 }}
        className='z-[100] fixed top-1/2 left-3 transform -translate-y-1/2 hidden xl:flex flex-col gap-2.5 w-14 p-2 rounded-md bg-gray-200 shadow'
      >
        <div className='self-center p-2 text-2xl'>
          <BiMenu />
        </div>
        { router.pathname === '/' && (hometabs.map(({icon, title}) =>
          <motion.span
            key={title}
            whileHover={{ scale: 1.05, x: 20 }}
            whileTap={{ scale: 0.995 }}
          >
            <NavLink 
              activeClass='bg-accent-primary text-white'
              to={title}
              spy={true}
              smooth={true}
              duration={500}
              className='flex gap-2.5 items-center p-2 font-semibold text-lg truncate rounded-md hover:bg-accent-primary hover:text-white cursor-pointer'
            >
              <span className='text-2xl'>{icon}</span>
              <span>{title}</span>
            </NavLink>
          </motion.span>
        ))}
        { router.pathname !== '/' &&
          <motion.span
            whileHover={{ scale: 1.05, x: 20 }}
            whileTap={{ scale: 0.995 }}
          >
            <Link passHref href='/'>
              <span
                className='flex gap-2.5 items-center p-2 font-semibold text-lg truncate rounded-md hover:bg-accent-primary hover:text-white cursor-pointer'
                onClick={() => setNavOpen(false)}
              >
                <span className='text-2xl'><BiHomeAlt /></span>
                <span>Home</span>
              </span>
            </Link>
          </motion.span>
        }
      </motion.div>
      {/* mobile navbar */}
      <div className='z-[100] fixed top-3 -left-1 xl:hidden px-4'>
        <div
          className={
            'flex flex-col gap-1.5 rounded-md bg-gray-200 shadow overflow-hidden transform-gpu transition-size duration-200 '
            + (navOpen ? 'p-2 ' : 'w-11 h-11 ')
            + (navOpen && (router.pathname === '/' ? 'w-48 h-[29rem] md:h-[25.75rem]' : 'w-48 h-[10.25rem] md:h-[7rem]'))
          }
        >
          <div className='flex w-full justify-between'>
            <span
              className='flex items-center p-2.5 text-lg rounded-md hover:bg-accent-primary cursor-pointer'
              onClick={() => setNavOpen(!navOpen)}
            >
              { navOpen
                ? <BiX className='text-2xl' />
                : <BiMenu className='text-2xl' />
              }
            </span>
          </div>
          { router.pathname === '/' && (hometabs.map(({icon, title}) =>
            <NavLink 
              key={'mobile'+title}
              activeClass='bg-accent-primary text-white'
              to={title}
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              className='flex gap-2.5 items-center p-2 font-semibold text-lg rounded-md hover:bg-accent-primary hover:text-white cursor-pointer'
              onClick={() => setNavOpen(false)}
            >
              <span className='text-2xl'>{icon}</span>
              <span>{title}</span>
            </NavLink>
          ))}
          { router.pathname !== '/' &&
            <Link passHref href='/'>
              <span
                className='flex gap-2.5 items-center p-2 font-semibold text-lg truncate rounded-md hover:bg-accent-primary hover:text-white cursor-pointer'
                onClick={() => setNavOpen(false)}
              >
                <span className='text-2xl'><BiHomeAlt /></span>
                <span>Home</span>
              </span>
            </Link>
          }
          <span className='block md:hidden self-center'>
            <ThemeButton />
          </span>
        </div>
      </div>
      <div
        className={
          'fixed top-0 left-0 w-full h-full bg-transparent transform-gpu transition-all duration-150 '
          + ( navOpen ? 'z-[90] visible' : 'z-0 invisible' )
        }
        onClick={() => setNavOpen(false)}
      />
    </>
  )
}