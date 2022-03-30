import { UseFormRegister, FieldValues, UseFormWatch } from 'react-hook-form'
import { Group, Input, Select, Radio, Checkbox } from '../components'
import {
  participation,
  daily_wellness_completion,
  MLH,
  states
}
from './options'

interface Props {
  register: UseFormRegister<FieldValues>
  errors: {
    [x: string]: any
  }
  setFileUploaded?: (arg0: boolean) => void
  watch: UseFormWatch<FieldValues>
}

export function Confirmation({ register, errors, watch }: Props) {
  const participation_confirmation = watch('participation')
  const lives_in_US = watch('lives_in_US')

  return (
    <>
      <Group title='Confirm Details'>
        <Radio
          label='Are you participating in-person or online?'
          subtext={
            <>
            <div className='mb-2'>
              <span className='font-medium'>Only UCR students can participate in-person. (Though exemptions may be made.)</span> In-person participants will also get free food, swag, and a chance to network with real engineers.
            </div>
            <div>
              <span className='font-medium'>If you plan to participate in-person, please have your vaccine cards.</span> We will check for them.
            </div>
            </>
          }
          variable='participation'
          options={participation}
          register={register}
          errors={errors}
          required
        />
        { participation_confirmation === 'In-Person' &&
          <Checkbox
            label='Have you filled out the Daily Wellness Survey?'
            variable='daily_wellness'
            options={daily_wellness_completion[0]}
            register={register}
            errors={errors}
            required
          />
        }
        <Checkbox
          label='Have you read the MLH Code of Conduct?'
          variable='MLH_code_of_conduct'
          options={MLH[0]}
          register={register}
          errors={errors}
          required
        />
        <Radio
          label='Do you live in the U.S.?'
          subtext='This is used only for shipping purposes. We will only be able to ship merchandise and/or prizes those who live within the U.S.'
          variable='lives_in_US'
          options={['Yes', 'No']}
          register={register}
          errors={errors}
          required
        />
      </Group>
      { lives_in_US === 'Yes' &&
        <Group title='Address' subtitle='Please input the best address to ship merchandise and/or prizes to you.'>
          <Input
            type='text'
            label='Address Line 1'
            variable='address_line_1'
            register={register}
            errors={errors}
            required
          />
          <Input
            type='text'
            label='Address Line 2'
            variable='address_line_2'
            register={register}
            errors={errors}
            required
          />
          <div className='grid sm:grid-cols-7 gap-3'>
            <span className='md:col-span-3'>
              <Input
                type='text'
                label='City'
                variable='city'
                register={register}
                errors={errors}
                required
              />
            </span>
            <span className='md:col-span-2'>
              <Select
                label='State'
                variable='state'
                register={register}
                errors={errors}
                options={states}
                required
              />
            </span>
            <span className='md:col-span-2'>
              <Input
                type='text'
                label='Zip/Postal Code'
                variable='zipcode'
                register={register}
                errors={errors}
                required
              />
            </span>
          </div>
        </Group>
      }
    </>
  )
}
