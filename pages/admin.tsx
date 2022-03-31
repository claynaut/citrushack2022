import React, { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { BiIdCard, BiBarChartAlt2, BiGroup, BiFile } from 'react-icons/bi'
import { ProtectedPage } from '@/components/Page'
import {
  Pages,
  Overview,
  Statistics,
  Groups,
  Resumes
} from '@/components/Admin'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Admin() {
  const { cache } = useSWRConfig()
  const { data, error } = useSWR('/api/users/query-all', fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return
  
      // Only retry up to 10 times.
      if (retryCount >= 10) return
  
      // Retry after 1.5 seconds.
      setTimeout(() => revalidate({ retryCount }), 1500)
    },
  })

  const cachedData = cache.get('/api/users/query-all')
  const [selectedPage, setSelectedPage] = useState('Overview')

  const pageOptions = [
    'Overview',
    'Statistics',
    'Groups',
    'Resumes',
  ]
  
  if (error || !data) {
    return (
      <ProtectedPage title='Admin' restrictions={['signin', 'admin']}>
        <section className='flex w-full my-24 max-w-[60rem] items-center'>
          <div className='flex flex-col w-full'>
            <h2 className='m-0 font-medium'>Dashboard</h2>
            <p className='italic'>
              <span className='font-semibold'>Note:</span> Using Cached Data...
            </p>
            <Pages
              pageOptions={pageOptions}
              icons={[
                <BiIdCard />,
                <BiBarChartAlt2 />,
                <BiGroup />,
                <BiFile />
              ]}
              selectedPage={selectedPage}
              selectPage={setSelectedPage}
            />
            { selectedPage === 'Overview' && <Overview data={cachedData} /> }
            { selectedPage === 'Statistics' && <Statistics data={cachedData} /> }
            { selectedPage === 'Groups' && <Groups data={cachedData} /> }
            { selectedPage === 'Resumes' && <Resumes /> }
          </div>
        </section>
      </ProtectedPage>
    )
  }
  else {
    return (
      <ProtectedPage title='Admin' restrictions={['signin', 'admin']}>
        <section className='flex w-full my-24 max-w-[60rem] items-center'>
          <div className='flex flex-col w-full'>
            <h2 className='m-0 font-medium'>Dashboard</h2>
            <Pages
              pageOptions={pageOptions}
              icons={[
                <BiIdCard />,
                <BiBarChartAlt2 />,
                <BiGroup />,
                <BiFile />
              ]}
              selectedPage={selectedPage}
              selectPage={setSelectedPage}
            />
            { selectedPage === 'Overview' && <Overview data={data} /> }
            { selectedPage === 'Statistics' && <Statistics data={data} /> }
            { selectedPage === 'Groups' && <Groups data={data} /> }
            { selectedPage === 'Resumes' && <Resumes /> }
          </div>
        </section>
      </ProtectedPage>
    )
  }
}
