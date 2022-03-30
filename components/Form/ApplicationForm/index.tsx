import React, { useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast'
import storage from '@/lib/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { PersonalInfo, Education, HackerApp } from './components'

export function ApplicationForm() {
  const { data: session } = useSession()
  const { register, handleSubmit, control } = useForm()
  const { errors } = useFormState({ control })
  const router = useRouter()
  const [clickedSubmitOnce, setClickedSubmitOnce] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)

  const determineCriteriaMet = (grad_date: string, grade: string) => {
    const [year, month, day] = grad_date.split('-')
    var criteria_met = true

    // determine if criteria to participate is met
    if (grade === 'Graduate')
      criteria_met = false
    if (parseInt(year) < 2022)
      criteria_met = false
    else if (parseInt(year) === 2022)
      if (parseInt(month) < 4)
        criteria_met = false
      else if (parseInt(month) === 4 && parseInt(day) <= 2)
        criteria_met = false

    return criteria_met
  }

  const uploadFile = async (resume, first_name: string, last_name: string, uid: string) => {
    if (fileUploaded) {
      const file = resume[0]
      const filename = first_name.replace(/\s/g, '') + '___' + last_name.replace(/\s/g, '') + '___' + uid + '.pdf'
      const fileRef = ref(storage, 'resumes/' + filename)
      const metadata = {
        contentType: 'application/pdf',
      }
      await uploadBytes(fileRef, file, metadata) // upload file
    }
  }

  const onSubmit = async({
    first_name,
    last_name,
    gender,
    ethnicity,
    phone_number,
    food_preference,
    shirt_size,
    school,
    major,
    grade,
    grad_date,
    resume,
    first_time,
    participation,
    MLH_code_of_conduct,
    MLH_privacy_policy,
    MLH_communication
  }) => {
    if (clickedSubmitOnce) { return }
    setClickedSubmitOnce(Boolean(true))

    // generate other user attributes
    let criteria_met = determineCriteriaMet(grad_date, grade)
    const uid = nanoid()

    await uploadFile(resume, first_name, last_name, uid)

    axios.post('/api/applications/create', {
      uid,      
      first_name,
      last_name,
      gender,
      ethnicity,
      phone_number,
      food_preference,
      shirt_size,
      school,
      major,
      grade,
      grad_date,
      first_time,
      participation,
      criteria_met,
      MLH_code_of_conduct,
      MLH_privacy_policy,
      MLH_communication
    })
    .then(() => {
      toast.success(
        'Successfully submitted your application!',
        { id: 'submitApplicationSuccess' }
      )
      router.reload()
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong. If this issue persists, let us know.',
        { id: 'submitApplicationError' }
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
      <h2 className='mb-6'>Application Form</h2>
      <p className='pb-4 w-full sm:max-w-2xl'>
        Fill out this form to apply for Citrus Hack 2022!
      </p>
      <p className='pb-4 w-full sm:max-w-2xl'>
        Within 24 hours of submitting, you will be notified via email about your application status.
      </p>
      <form 
        className='flex flex-col gap-4 w-full sm:max-w-2xl self-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <PersonalInfo
          session={session}
          register={register}
          errors={errors}
        />
        <Education
          register={register}
          errors={errors}
        />
        <HackerApp
          register={register}
          errors={errors}
          setFileUploaded={setFileUploaded}
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