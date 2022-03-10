import { useForm, useFormState } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast'
import storage from '@/lib/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { Input, Select, Radio, Checkbox } from './components'
import ExternalLink from '@/components/ExternalLink'

interface GroupProps {
  title: string
  children: React.ReactNode | React.ReactNode[]
}

const Group = ({title, children}: GroupProps) => (
  <div className='flex flex-col gap-3 sm:p-6 bg-card sm:rounded-md sm:shadow-md '>
    <h4 className='mt-0 font-semibold'>{title}</h4>
    {children}
  </div>
)

export function ApplicationForm() {
  const { data: session } = useSession()
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
  const participation = [
    'In-Person',
    'Online',
  ]
  const foodPreference = [
    'Meat',
    'Vegetarian',
    'Vegan'
  ]
  const shirtSize = [
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'
  ]
  const MLH = [
    [
      <>
        I have read and agree to 
        the <ExternalLink name='MLH Code of Conduct' link='https://github.com/MLH/mlh-policies/blob/master/code-of-conduct.md'/>.
      </>
    ],
    [
      <>
        I authorize you to share my application/registration information with Major League Hacking for event
        administration, ranking, and MLH administration in-line with 
        the <ExternalLink name='MLH Privacy Policy' link='https://github.com/MLH/mlh-policies/blob/master/privacy-policy.md'/>. 
        I further agree to the terms of both 
        the <ExternalLink name='MLH Contest Terms and Conditions' link='https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md'/>
        &nbsp;and the <ExternalLink name='MLH Privacy Policy' link='https://github.com/MLH/mlh-policies/blob/master/privacy-policy.md'/>.
      </>
    ],
    ['I authorize MLH to send me pre- and post-event informational emails, which contain free credit and opportunities from their partners.']
  ]

  const onSubmit = ({
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
      else if (parseInt(month) === 4 && parseInt(day) <= 2)
        criteria_met = false

    const uid = nanoid()

    const file = resume[0]
    const filename = first_name.replace(/\s/g, '') + '___' + last_name.replace(/\s/g, '') + '___' + uid + '.pdf'
    const fileRef = ref(storage, 'resumes/' + filename)
    uploadBytes(fileRef, file) // upload file

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
        <Group title='Personal Info'>
          <div className='grid sm:grid-cols-2 gap-3'>
            <Input
              type='text'
              defaultValue={
                (session.user.name && session.user.name.first !== 'undefined')
                ? session.user.name.first 
                : undefined
              }
              label='First Name'
              variable='first_name'
              register={register}
              errors={errors}
              required
            />
            <Input
              type='text'
              defaultValue={
                (session.user.name && session.user.name.last !== 'undefined')
                ? session.user.name.last 
                : undefined
              }
              label='Last Name'
              variable='last_name'
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className='grid sm:grid-cols-3 gap-3'>
            <Select
              label='Gender'
              variable='gender'
              register={register}
              errors={errors}
              options={genders}
              required
            />
            <span className='sm:col-span-2'>
              <Select
                label='Ethnicity'
                variable='ethnicity'
                register={register}
                errors={errors}
                options={ethnicities}
                required
              />
            </span>
          </div>
          <div className='grid sm:grid-cols-2'>
          <Input
            type='text'
            label='Phone Number'
            variable='phone_number'
            register={register}
            errors={errors}
          />
          </div>
          <Radio
            label='Food Preference'
            variable='food_preference'
            options={foodPreference}
            register={register}
            errors={errors}
            required
          />
          <Radio
            label='T-Shirt Size'
            variable='shirt_size'
            options={shirtSize}
            register={register}
            errors={errors}
            required
          />
        </Group>
        <Group title='Education'>
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
          <div className='grid sm:grid-cols-2 gap-3'>
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
          </div>
        </Group>
        <Group title='Hacker App'>
          <Input
            type='file'
            label='Resume'
            variable='resume'
            register={register}
            errors={errors}
          />
          <Radio
            label='First time hacker?'
            variable='first_time'
            options={firstTimeHacker}
            register={register}
            errors={errors}
            required
          />
          <Radio
            label='Are you participating in-person or online?'
            subtext='In-person participants will get free food, swag, and a chance to network with real engineers.'
            variable='participation'
            options={participation}
            register={register}
            errors={errors}
            required
          />
          <span className='flex flex-col mt-4 gap-2'>
            <Checkbox
              label=''
              variable='MLH_code_of_conduct'
              options={MLH[0]}
              register={register}
              errors={errors}
              required
            />
            <Checkbox
              label=''
              variable='MLH_privacy_policy'
              options={MLH[1]}
              register={register}
              errors={errors}
              required
            />
            <Checkbox
              label=''
              variable='MLH_communication'
              options={MLH[2]}
              register={register}
              errors={errors}
              required
            />
          </span>
        </Group>
        <motion.button
          whileHover={{ scale: 1.05}} 
          whileTap={{ scale: 0.995 }}
          type='submit'
          className='w-full py-1.5 rounded bg-highlight hover:bg-highlight-dark font-semibold text-white'
          onClick={() => triggerErrorNotification()}
        >
          Submit
        </motion.button>
      </form>
    </main>
  )
}