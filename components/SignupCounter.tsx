import useSWR from 'swr'
import { BiEdit } from 'react-icons/bi'

const fetcher = (url) => fetch(url).then((res) => res.json())

/** Counter for number of users that created an account. */
export default function SignupCounter() {
  const { data, error } = useSWR('/api/users/count', fetcher)

  if (error) {
    return (
      <div className='flex items-center gap-2'>
        <BiEdit className='text-3xl' />
        <h4 className='font-medium'>There seems to be an error.</h4>
      </div>
    )
  }
  if (!data) {
    return (
      <div className='flex items-center gap-2'>
        <BiEdit className='text-3xl' />
        <h4 className='font-medium'>
          <span className='font-bold'>...</span> 
          &nbsp;hackers signed up so far!
        </h4>
      </div>
    )
  } else
    return (
      <div className='flex items-center gap-2'>
        <BiEdit className='text-3xl' />
        <h4 className='font-medium'>
          <span className='font-bold'>{data.numUsers} hackers</span>
          &nbsp;signed up so far!
        </h4>
      </div>
    )
}