import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiFilter } from 'react-icons/bi'

export function UserFilter({ filters, setFilter, currentFilter, setSorted }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false)
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [setOpen])

  return (
    <>
      <div className='relative'>
        <div
          className='grow-0 mr-2 p-2 rounded-full text-2xl text-gray-500 hover:bg-gray-100 cursor-pointer'
          onClick={() => setOpen(!open)}
        >
          <BiFilter title='Filter' />
        </div>
        <div
          className={
            'absolute top-12 left-0 w-64 py-2 rounded text-base bg-white shadow-lg transform-gpu transition-all duration-150 '
            + ( open ? 'z-[100] visible opacity-100' : 'z-0 invisible opacity-0' )
          }
        >
          {
            filters.map((filter: string) =>
              <div
                key={filter}
                className={
                  'px-4 py-1.5 cursor-pointer '
                  + (filter === currentFilter ? 'font-medium text-blue-500 hover:bg-blue-100' : 'hover:bg-gray-100')
                }
                onClick={() => { setOpen(false); setFilter(filter); setSorted(filter != 'Default') }}
              >
                {filter}
              </div>
            )
          }
        </div>
      </div>
      <div
        className={
          'fixed top-0 left-0 w-full h-full transform-gpu transition-all duration-150 '
          + ( open ? 'z-[90] visible opacity-100' : 'z-0 invisible opacity-0' )
        }
        onClick={() => setOpen(false)}
      />
    </>
  )
}