import { useForm, useFormState } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { Input, Select, Radio } from '@/components/Form'

export default function ApplicationForm() {
  const { register, handleSubmit, control } = useForm()
  const { errors } = useFormState({ control })
  const router = useRouter()
  const genders = [
    'Male',
    'Female',
    'Nonbinary',
    'Other',
    'Prefer not to say',
  ]
  const ethnicities = [
    'American Indian or Alaska Native',
    'Asian',
    'Black or African American',
    'Hispanic or Latino',
    'Native Hawaiian or Other Pacific Islander',
    'White',
    'Other',
    'Prefer not to say',
  ]
  const majors = [
    'Bioengineering',
    'Chemical Engineering',
    'Computer Engineering',
    'Computer Science',
    'Computer Science and Business Applications',
    'Data Science',
    'Electrical Engineering',
    'Environmental Engineering',
    'Materials Science and Engineering',
    'Mechanical Engineering',
    'Other STEM Major Not Listed',
    'Humanities Major',
    'Other Major',
  ]
  const grades = [
    'High School',
    '1st Year Undergraduate',
    '2nd Year Undergraduate',
    '3rd Year Undergraduate',
    '4th Year Undergraduate',
    '5th+ Year Undergraduate',
    'Graduate',
    'International',
  ]
  const firstTimeHacker = [
    'Yes',
    'No',
  ]

  const onSubmit = ({
    first_name,
    last_name,
    gender,
    ethnicity,
    school,
    major,
    grade,
    grad_date,
    first_time,
  }) => {
    const [year, month, day] = grad_date.split('-')
    let criteria_met = true

    // determine if criteria to participate is met
    if (grade === 'Graduate')
      criteria_met = false
    if (parseInt(year) < 2022)
      criteria_met = false
    else if (parseInt(year) === 2022)
      if (parseInt(month) < 4)
        criteria_met = false
      else if (parseInt(month) === 4 && parseInt(day) <= 10)
        criteria_met = false

    axios.post('/api/applications/create', {
      first_name,
      last_name,
      gender,
      ethnicity,
      school,
      major,
      grade,
      grad_date,
      first_time,
      criteria_met,
    })
    .then(() => {
      toast.success(
        'Successfully submitted your application!',
        { id: 'submitApplicationSuccess'}
      )
      router.push('/')
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong. If this issue persists, let us know.',
        { id: 'submitApplicationError'}
      )
    });
  }

  const triggerErrorNotification = () => {
    if (Object.keys(errors).length > 0) {
      toast.error('Please fill out all required fields.', {
        id: 'applicationNotFilledOut',
      })
    }
  }

  return (
    <main className='flex flex-col items-center my-24 px-4 w-full'>
      <h2 className='mb-6'>Application Form</h2>
      <p className='pb-4 w-full sm:max-w-md'>
        Fill out this form to apply for Citrus Hack 2022!
      </p>
      <p className='pb-4 w-full sm:max-w-md'>
        Within 24 hours of submitting, you will be notified via email about your application status.
      </p>
      <form 
        className='flex flex-col gap-3 w-full sm:max-w-md self-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type='text'
          label='First Name'
          variable='first_name'
          register={register}
          errors={errors}
          required
        />
        <Input
          type='text'
          label='Last Name'
          variable='last_name'
          register={register}
          errors={errors}
          required
        />
        <Select
          label='Gender'
          variable='gender'
          register={register}
          errors={errors}
          options={genders}
          required
        />
        <Select
          label='Ethnicity'
          variable='ethnicity'
          register={register}
          errors={errors}
          options={ethnicities}
          required
        />
        <Input
          type='text'
          label='School'
          variable='school'
          register={register}
          errors={errors}
          required
        />
        <Select
          label='Major'
          variable='major'
          register={register}
          errors={errors}
          options={majors}
          required
        />
        <Select
          label='Grade'
          variable='grade'
          register={register}
          errors={errors}
          options={grades}
          required
        />
        <Input
          type='date'
          label='Graduation Date'
          variable='grad_date'
          register={register}
          errors={errors}
          required
        />
        <Radio
          label='First time hacker?'
          variable='first_time'
          options={firstTimeHacker}
          register={register}
          errors={errors}
          required
        />
        <motion.button
          whileHover={{ scale: 1.03}} 
          whileTap={{ scale: 0.995 }}
          type='submit'
          className='w-full py-1.5 rounded bg-accent-primary hover:bg-accent-primary-dark font-semibold text-white'
          onClick={() => triggerErrorNotification()}
        >
          Submit
        </motion.button>
      </form>
    </main>
  )
}