import React, { useState, useEffect } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { BiX } from 'react-icons/bi'

interface Props {
  show: boolean
  handler: (arg0: boolean) => void
  title: string
  description: string
  children: React.ReactNode | React.ReactNode[]
}

export default function Modal({ show, handler, title, description, children }: Props) {
  const [targetElement, setTargetElement] = useState(null)

  useEffect(() => {
    setTargetElement(document.querySelector('#modal'))
    if (targetElement) {
      if (show) disableBodyScroll(targetElement)
      else enableBodyScroll(targetElement)
    }
  }, [targetElement, show])

  return(
    <>
      <div
        id='modal'
        className={
          'fixed top-1/2 left-1/2 w-11/12 sm:w-[32rem] p-4 rounded bg-white transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 '
          + ( show ? 'z-[110] visible opacity-100' : 'z-0 invisible opacity-0' )
        }
      >
        <div className='flex flex-col gap-4 items-center w-full mb-8'>
          <BiX
            className='self-end text-3xl hover:text-red-500 cursor-pointer'
            onClick={() => handler(false)}
          />
          <h3 className='text-center w-full max-w-md font-semibold'>
            {title}
          </h3>
          <p className='text-center w-full max-w-md'>
            {description}
          </p>
          <div className='w-full max-w-md'>
            {children}
          </div>
        </div>
      </div>
      <div
        className={
          'fixed top-0 left-0 w-full h-full bg-overlay transition-opacity duration-150 '
          + ( show ? 'z-[100] visible opacity-100' : 'z-0 invisible opacity-0' )
        }
        onClick={() => handler(false)}
      />
    </>
  )
}