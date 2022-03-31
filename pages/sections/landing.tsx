import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { CountdownWrapper } from '@/components/Countdown'
import { ButtonLink } from '@/components/ButtonLink'
import Modal from '@/components/Modal'
import { SigninForm } from '@/components/Form'
import SignupCounter from '@/components/SignupCounter'

export default function Landing() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const { data: session, status } = useSession()
  const [signinModalOpen, setSigninModalOpen] = useState(false)

  const toggleSigninModal = () => {
    setSigninModalOpen(!signinModalOpen)
  }
  
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <>
      <section className='relative flex flex-col-reverse w-full h-screen min-h-[48rem] md:min-h-[60rem] xl:max-w-[68rem] 2xl:max-w-[80rem] justify-center items-center my-40 lg:my-0 mb-20 md:mb-0 gap-6'>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5
          }}
          className='lg:self-end max-w-[30rem] lg:max-w-[80rem] lg:w-5/12 xl:w-1/2 2xl:w-7/12 transform-gpu'
        >
          <Image
            src={theme == 'light' ? '/assets/island-light.svg' : '/assets/island-dark.svg'}
            width={ 1712.57}
            height={1734.07}
            quality={50}
            priority={Boolean(true)}
            objectFit='contain'
          />
        </motion.div>
        <div className='lg:absolute flex flex-col left-4 2xl:left-0 items-center'>
          <div className='flex flex-col max-w-xl'>
            <div className='flex flex-col sm:flex-row items-center text-center sm:text-left sm:mb-10'>
              <Image
                src={'/assets/logo.svg'}
                width={150}
                height={150}
                objectFit='contain'
              />
              <div>
                <h1 className='font-black uppercase'>Citrus Hack</h1>
                <h3 className='font-bold text-highlight-dark'>April 2-3, 2022</h3>
              </div>
            </div>
          </div>
          <CountdownWrapper date='2022-04-02T09:00:00' />
          <p className='max-w-lg italic text-center font-medium'>
            In-person sign-ups will close today at 5:30 PM PST, as we are reaching maximum capacity
          </p>
          <span className='flex justify-center w-full mb-6'>
            <SignupCounter />
          </span>
          { status === 'authenticated' 
            && !session.user.uid &&
            <span className='flex justify-center w-full z-[200]'>
              <ButtonLink
                primary
                label='Apply Now'
                link='/apply'
              />
            </span>
          }
          { !session &&
            <span className='flex justify-center w-full z-[200]'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.995 }}
                className='flex justify-center items-center self-center w-full md:max-w-[16rem] h-11 px-4 font-semibold text-lg rounded-md bg-highlight shadow cursor-pointer'
                onClick={() => toggleSigninModal()}
              >
                Sign In
              </motion.button>
            </span>
          }
          <div className='flex flex-col gap-3'>
            { status === 'authenticated' 
              && session.user.uid
              && session.user.qualified === 'yeah' &&
              <>
                <span className='flex justify-center w-full z-[200]'>
                  <ButtonLink
                    primary
                    label='Join Our Discord'
                    link={process.env.discord}
                    external
                  />
                </span>
                <span className='flex justify-center w-full z-[200]'>
                  <ButtonLink
                    primary
                    label='Group Dashboard'
                    link='/group/dashboard'
                  />
                </span>
              </>
            }
            {/* uncomment the day before */}
            {/* { status === 'authenticated' 
              && session.user.uid
              && session.user.qualified === 'yeah'
              && !session.user.checkedIn &&
              <span className='flex justify-center w-full z-[200]'>
                <ButtonLink
                  primary
                  label='Check-In Now!'
                  link='/checkin'
                />
              </span>
            } */}
          </div>
        </div>
      </section>
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