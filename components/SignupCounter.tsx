import useSWR, { useSWRConfig } from 'swr'
import CountUp from 'react-countup'
import { BiEdit } from 'react-icons/bi'

const fetcher = (url) => fetch(url).then((res) => res.json())

/** Counter for number of users that created an account. */
export default function SignupCounter() {
  const { cache } = useSWRConfig()
  const { data, error } = useSWR('/api/users/count', fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return
  
      // Only retry up to 10 times.
      if (retryCount >= 10) return
  
      // Retry after 1.5 seconds.
      setTimeout(() => revalidate({ retryCount }), 1500)
    },
  })

  const cachedCount = cache.get('/api/users/count')

  if (error || !data) {
    return (
      <div className='flex items-center gap-2'>
        <BiEdit className='text-3xl' />
        <h4 className='font-medium'>
          <span className='font-bold'>
            <CountUp
              start={cachedCount.numUsers - 100}
              end={cachedCount.numUsers}
              duration={1.5}
            />  
          </span> 
          &nbsp;hackers signed up so far!
        </h4>
      </div>
    )
  } else {
    return (
      <div className='flex items-center gap-2'>
        <BiEdit className='text-3xl' />
        <h4 className='font-medium'>
          <span className='font-bold'>
            <CountUp
              start={data.numUsers - 100}
              end={data.numUsers}
              duration={1.5}
            />  
          </span>
          &nbsp;hackers signed up so far!
        </h4>
      </div>
    )
  }
}