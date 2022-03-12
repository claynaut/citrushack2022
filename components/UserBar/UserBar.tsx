import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ThemeButton } from './ThemeButton'
import { UserDropdown } from './UserDropdown'
import Modal from '@/components/Modal'
import { SigninForm } from '@/components/Form'

export function UserBar() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [signinModalOpen, setSigninModalOpen] = useState(false)

  const toggleSigninModal = () => {
    setSigninModalOpen(!signinModalOpen)
  }

  return (
    <>
      <div className='z-[1000] fixed top-3 right-3 flex gap-3'>
        { status === 'authenticated' && !session.user.uid && router.pathname !== '/apply' &&
          <Link passHref href='/apply'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.995 }}
              className='flex justify-center items-center self-center w-24 h-11 px-4 font-semibold text-lg rounded-md bg-highlight shadow cursor-pointer'
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
              className='flex justify-center items-center self-center w-24 h-11 px-4 font-semibold text-lg rounded-md bg-highlight shadow cursor-pointer'
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
        description='Sign in to Citrus Hack via Google to apply and access more. No password required.'
        show={signinModalOpen}
        handler={setSigninModalOpen}
      >
        <SigninForm />
      </Modal>
    </>
  )
}