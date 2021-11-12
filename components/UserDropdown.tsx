import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { BiUser, BiX, BiLogOutCircle } from 'react-icons/bi'

export default function UserDropdown() {
  const router = useRouter()
  const { data: session } = useSession()
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      setProfileOpen(false)
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [setProfileOpen])

  return (
    <>
      <div className='relative'>
        <motion.button
          whileHover={{ scale: 1.05}} 
          whileTap={{ scale: 0.995 }}
          className='z-[100] flex justify-center items-center w-11 h-11 rounded-md bg-accent-primary hover:bg-accent-primary-dark text-white'
          onClick={() => setProfileOpen(!profileOpen)}
        >
          {
            profileOpen 
              ? <BiX className='text-2xl'/>
              : <BiUser className='text-2xl'/>
          }
        </motion.button>
        <div
          className={
            'absolute top-14 right-0 w-64 p-4 rounded bg-white shadow-md transition-all duration-150 '
            + ( profileOpen ? 'z-[100] visible opacity-100' : 'z-0 invisible opacity-0' )
          }
        >
          <div className='flex flex-col gap-3 items-center w-full text-lg'>
            <div className='flex flex-col gap-2 items-center w-full pb-3 border-b-[1px] border-gray-300'>
              <p className='flex text-center text-gray-500 text-sm'>
                Signed in as <br/>
                {session.user.email}
              </p>
              <Link passHref href='/apply'>
                <motion.button
                  whileHover={{ scale: 1.05}} 
                  whileTap={{ scale: 0.995 }}
                  className='w-full py-1.5 rounded-md bg-accent-primary hover:bg-accent-primary-dark font-semibold text-white'
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  Apply Now
                </motion.button>
              </Link>
            </div>
            <motion.button
              whileHover={{ scale: 1.03}} 
              whileTap={{ scale: 0.995 }}
              className='group flex items-center gap-1.5 w-full rounded-md font-semibold text-gray-500'
              onClick={() => signOut()}
            >
              <div className='p-1.5 group-hover:bg-accent-primary rounded-md bg-gray-300 text-2xl text-white'>
                <BiLogOutCircle />
              </div>
              <div className='p-1.5 group-hover:text-accent-primary'>
                Sign Out
              </div>
            </motion.button>
          </div>
        </div>
      </div>
      <div
        className={
          'fixed top-0 left-0 w-full h-full transition-all duration-150 '
          + ( profileOpen ? 'z-[90] visible opacity-100' : 'z-0 invisible opacity-0' )
        }
        onClick={() => setProfileOpen(false)}
      />
    </>
  )
}