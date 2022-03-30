import React, { useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Confirmation } from './components'

export function CheckinForm() {
  const { data: session } = useSession()
  const { register, handleSubmit, control, watch } = useForm()
  const { errors } = useFormState({ control })
  const router = useRouter()
  const [clickedSubmitOnce, setClickedSubmitOnce] = useState(false)

  const onSubmit = async({
    address,
    participation,
    MLH_code_of_conduct
  }) => {
    if (clickedSubmitOnce) { return }
    setClickedSubmitOnce(Boolean(true))

    axios.post('/api/users/check-in', {
      uid: session.user.uid,
      participation,
      MLH_code_of_conduct,
      address,
    })
    .then(() => {
      toast.success(
        'Successfully checked in!',
        { id: 'checkinSuccess' }
      )
      router.reload()
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong. If this issue persists, let us know.',
        { id: 'checkinError' }
      )
      setClickedSubmitOnce(Boolean(false))
    })
  }

  const triggerErrorNotification = () => {
    if (Object.keys(errors).length > 0) {
      toast.error('Please fill out all required fields.', 
        { id: 'applicationNotFilledOut' }
      )
    }
  }

  return (
    <main className='flex flex-col items-center my-24 px-4 w-full'>
      <h2 className='mb-6'>Check-in Form</h2>
      <p className='pb-4 w-full sm:max-w-2xl'>
        Fill out this form to confirm your participation for Citrus Hack 2022!
      </p>
      <form 
        className='flex flex-col gap-4 w-full sm:max-w-2xl self-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Confirmation
          register={register}
          errors={errors}
          watch={watch}
        />
        <motion.button
          whileHover={{ scale: 1.05}} 
          whileTap={{ scale: 0.995 }}
          type='submit'
          className='w-full py-1.5 rounded bg-highlight hover:bg-highlight-dark font-semibold text-white'
          onClick={() => triggerErrorNotification()}
        >
          {clickedSubmitOnce ? 'Submitting...' : 'Submit'}
        </motion.button>
      </form>
    </main>
  )
}