import React, { useState } from 'react'
import useMultSWR from '@/lib/multswr'
import { ProtectedPage } from '@/components/Page'
import {
  Pages,
  Overview,
  Statistics,
  Groups,
  Resumes
} from '@/components/Admin'

export default function Admin() {
  const { data, error } = useMultSWR(['/api/users/query', '/api/groups/query-all'])
  const [selectedPage, setSelectedPage] = useState('Overview')

  const pageOptions = [
    'Overview',
    'Statistics',
    'Groups',
    'Resumes',
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
          { selectedPage === 'Overview' && <Overview data={data[0]} /> }
          { selectedPage === 'Statistics' && <Statistics data={data[0]} /> }
          { selectedPage === 'Groups' && <Groups data={data[1]} /> }
          { selectedPage === 'Resumes' && <Resumes /> }
        </div>
      </section>
    </ProtectedPage>
  )
}
