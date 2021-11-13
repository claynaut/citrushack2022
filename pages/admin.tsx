import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import ProtectedPage from '@/components/ProtectedPage'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Landing() {
  const { data, error } = useSWR('/api/applications/query', fetcher)
  const { data: session } = useSession()

  if (error) 
    return (
      <ProtectedPage title='Admin' restrictions={['signin', 'admin']}>
        <section className='flex flex-col w-full justify-center items-center'>
          Error...
        </section>
      </ProtectedPage>
    )

  if (!data) 
    return (
      <ProtectedPage title='Admin' restrictions={['signin', 'admin']}>
        <section className='flex flex-col w-full justify-center items-center'>
          Loading...
        </section>
      </ProtectedPage>
    )

  return (
    <ProtectedPage title='Admin' restrictions={['signin', 'admin']}>
      <section className='flex w-full my-24 items-center'>
        <div className='flex flex-col w-full'>
          <h1>Admin</h1>
          { session && session.user.admin &&
            data.apps.map(({uid, name, grade, graduationDate, firstTimeHacker}) =>
              <div className='grid grid-cols-2'>
                <div className='grid grid-cols-1'>
                  <div>
                    {uid}
                  </div>
                </div>
                <div className='grid grid-cols-2'>
                  <div>
                    {name.first}
                  </div>
                  <div>
                    {name.last}
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </section>
    </ProtectedPage>
  )
}
