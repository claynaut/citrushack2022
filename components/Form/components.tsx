import { UseFormRegister, FieldValues } from 'react-hook-form'
interface InputProps {
  type: string,
  defaultValue?: string,
  label: string,
  variable: string,
  register: UseFormRegister<FieldValues>,
  required?: boolean,
  errors: {
    [x: string]: any
  }
}

export const Input = ({ 
  type, 
  defaultValue, 
  label, 
  variable, 
  register, 
  required, 
  errors 
}: InputProps) => (
  <div>
    <label className='font-semibold'>
      {label}
      {!required && <span className='text-sub'> (optional)</span>}
    </label>
    {
      type === 'file' &&
      <p className='m-0 mb-1 text-sm italic'>
        Will be used for recruiting purposes.
      </p>
    }
    <input
      type={type}
      defaultValue={defaultValue}
      {...register(variable, {required})}
      className={
        'w-full border-sub rounded focus:border-highlight focus:outline-none focus:ring-highlight file:px-4 file:py-1.5 file:rounded-full file:border-0 file:bg-sub file:text-sm file:font-semibold file:cursor-pointer hover:file:bg-sub-dark '
        + (type === 'date' ? 'py-1.5 ' : 'py-1 ')
        + (type === 'file' ? '' : 'bg-card px-2 border-2 ' )
        + (errors[variable] ? 'border-red-500' : 'border-sub')
      }
    />
  </div>
)

interface SelectProps {
  label: string,
  variable: string,
  register: UseFormRegister<FieldValues>,
  required?: boolean,
  options: string[],
  errors: {
    [x: string]: any
  }
}
  
export const Select = ({
  label,
  variable,
  register,
  required,
  options,
  errors
}: SelectProps) => (
  <div>
    <label className='font-semibold'>{label}</label>
    <select
      {...register(variable, {required})}
      className={
        'w-full px-2 py-1.5 rounded border-2 focus:border-highlight focus:outline-none focus:ring-highlight bg-card overflow-ellipsis '
        + (errors[variable] ? 'border-red-500' : 'border-sub')
      }
    >
      <option 
        value=''
        disabled
        selected
        hidden
      >
        Select {label.toLowerCase()}...
      </option>
      {
        options.map((option: string) =>
          <option value={option}>{option}</option>
        )
      }
    </select>
  </div>
)

interface RadioProps {
  label: string,
  variable: string,
  register: UseFormRegister<FieldValues>,
  required?: boolean,
  options: string[],
  errors: {
    [x: string]: any
  },
  direction?: 'row' | 'col'
}

export const Radio = ({
  register,
  label,
  variable,
  required,
  options,
  errors,
  direction
}: RadioProps ) => (
  <div>
    <legend className='font-semibold'>{label}</legend>
    <div className={(direction === 'row') ? 'flex flex-col sm:flex-row gap-3 sm:gap-6 pl-2 ' : 'flex flex-col gap-3 pl-2'}>
      {
        options.map((option: string) =>
          <div id={label} className='flex items-center gap-2'>
            <input
              type='radio'
              id={variable.toString() + option.toString()}
              value={option}
              {...register(variable, {required})}
              className={
                'focus:checked:bg-highlight hover:checked:bg-highlight checked:ring-highlight checked:bg-highlight cursor-pointer ' + (errors[variable] && 'border-red-500')
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

Radio.defaultProps = {
  direction: 'row'
}