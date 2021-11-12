import { useForm, useFormState } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'

const Input = ({ type, label, variable, register, required, errors }) => (
  <div>
    <label className='font-semibold'>
      {label}
      {!required && <span className='text-gray-400'> (optional)</span>}
    </label>
    <input
      type={type}
      {...register(variable, {required})}
      className={
        'w-full px-2 rounded border-2 focus:border-accent-primary focus:outline-none focus:ring-accent-primary '
        + (type === 'date' ? 'py-1.5 ' : 'py-1 ')
        + (errors[variable] ? 'border-red-500' : 'border-gray-300')
      }
    />
  </div>
)

const Select = ({ label, variable, register, required, options, errors }) => (
  <div>
    <label className='font-semibold'>{label}</label>
    <select
      {...register(variable, {required})}
      className={
        'w-full px-2 py-1.5 rounded border-2 focus:border-accent-primary focus:outline-none focus:ring-accent-primary overflow-ellipsis '
        + (errors[variable] ? 'border-red-500' : 'border-gray-300')
      }
      
    >
      <option 
        value=''
        disabled
        selected
        hidden
      >
        Select your {label.toLowerCase()}...
      </option>
      {
        options.map((option: string) =>
          <option value={option}>{option}</option>
        )
      }
    </select>
  </div>
)

const Radio = ({ register, label, variable, required, options, errors }) => (
  <div>
    <legend className='font-semibold'>{label}</legend>
    <div className='flex flex-col gap-2 pl-2'>
      {
        options.map((option) =>
          <div id={label} className='flex items-center gap-2'>
            <input
              type='radio'
              id={variable.toString() + option.toString()}
              value={option}
              {...register(variable, {required})}
              className={
                'cursor-pointer ' + (errors[variable] && 'border-red-500')
              }
            />
            <label
              htmlFor={variable.toString() + option.toString()}
              className={
                'cursor-pointer ' + (errors[variable] && 'text-red-500')
              }
            >
              {option}
            </label>
          </div>
        )
      }
    </div>
  </div>
)

export default function ApplicationForm() {
  const { register, handleSubmit, control } = useForm()
  const { errors, isSubmitSuccessful } = useFormState({ control })
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

  const onSubmit = data => {
    const {
      first_name,
      last_name,
      gender,
      ethnicity,
      school,
      major,
      grade,
      grad_date,
      first_time,
    } = data

    const [year, month, day] = grad_date.split('-')
    let criteria_met = true

    if (grade === 'Graduate')
      criteria_met = false
    if (parseInt(year) > 2022)
      criteria_met = false
    else if (parseInt(year) === 2022)
      if (parseInt(month) > 4)
        criteria_met = false
      else if (parseInt(month) === 4 && parseInt(day) >= 10)
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
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <main className='flex flex-col justify-center items-center px-4 w-full min-h-screen'>
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
        >
          Submit
        </motion.button>
      </form>
    </main>
  )
}