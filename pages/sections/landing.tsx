import Image from 'next/image'
import { CountdownWrapper } from '@/components/Countdown'

export default function Landing() {
  return (
    <section className='flex flex-col w-full h-screen md:min-h-[60rem] max-w-[60rem] justify-center mb-20 md:mb-0'>
      <div className='flex flex-col max-w-xl'>
        <div className='flex flex-col sm:flex-row items-center text-center sm:text-left sm:mb-10'>
          <Image
            src={'/assets/logo.svg'}
            width={150}
            height={150}
            objectFit='contain'
          />
          <div>
            <h1>Citrus Hack</h1>
            <h3>April 2-3, 2022</h3>
          </div>
        </div>
        <h3 className='text-center sm:text-left font-semibold'>
          Grow your potential in...
        </h3>
      </div>
      <CountdownWrapper date='2022-04-02T09:00:00' />
    </section>
  )
}