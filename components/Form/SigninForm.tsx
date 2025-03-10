import React, { useState } from 'react'
import { signIn, getCsrfToken } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

/** Form displaying user sign-in options. */
export function SigninForm({ csrfToken = '' }) {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState(false)

  const handleEmailChange = () => {
    setError(false)
  }

  /** Action done on submit to sign-in with email. */
  const onSubmit = ({ email, csrfToken }) => {
    const matchRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)

    if (email === '' || !matchRegex) {
      toast.error('Please enter a valid email.')
      setError(true)
    }
    else {
      axios.post('/api/auth/signin/email', {
        csrfToken: csrfToken,
        email: email
      })
      .then(() => {
        signIn('email', { csrfToken: csrfToken, email: email })
      })
    }
  }

  return (
    <div className='flex flex-col w-full items-center'>
      <form
        className='flex flex-col w-full gap-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type='hidden'
          {...register('csrfToken')}
          defaultValue={csrfToken}
        />
        <div>
          <label className='font-semibold'>
            Email Address
          </label>
          <input 
            {...register('email')}
            onChange={handleEmailChange}
            className={
              'w-full px-2 py-1 rounded border-2 bg-card focus:border-accent-primary focus:outline-none focus:ring-accent-primary '
              + ( error ? 'border-red-500' : 'border-sub')
            }
          />
        </div>
        <motion.button
          type='submit'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.995 }}
          className='w-full py-1.5 rounded bg-highlight hover:bg-highlight-dark font-semibold'
        >
          Sign In With Email
        </motion.button>
      </form>
      <div className='flex flex-col gap-6 pt-6 justify-center w-full'>
        <div className='text-center border-b-2 border-sub leading-[0.1rem]'>
          <span className='px-4 bg-secondary text-sub'>or</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.995 }}
          className='w-full py-1.5 rounded bg-highlight hover:bg-highlight-dark font-semibold'
          onClick={() => signIn('google')}
        >
          Sign In With Google
        </motion.button>
      </div>
    </div>
  )

}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken }
  }
}