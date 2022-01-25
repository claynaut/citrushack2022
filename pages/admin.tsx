import React, { useState } from 'react'
import useSWR from 'swr'
import ProtectedPage from '@/components/ProtectedPage'
import {
  Pages,
  Overview,
  Statistics,
  Groups
} from '@/components/Admin'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Admin() {
  const { data, error } = useSWR('/api/users/query', fetcher)
  const [selectedPage, setSelectedPage] = useState('Overview')

  const pageOptions = [
    'Overview',
    'Statistics',
    'Groups',
  ]
  
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
          <h2 className='m-0 font-medium'>Dashboard</h2>
          <Pages
            pageOptions={pageOptions}
            selectedPage={selectedPage}
            selectPage={setSelectedPage}
          />
          { selectedPage === 'Overview' && <Overview data={data} /> }
          { selectedPage === 'Statistics' && <Statistics data={data} /> }
          { selectedPage === 'Groups' && <Groups data={data} /> }
        </div>
      </section>
    </ProtectedPage>
  )
}
