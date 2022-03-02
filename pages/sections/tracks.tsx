import { TrackBlocks } from '@/components/TrackBlocks'
import { motion } from 'framer-motion'

export default function Tracks() {
  return (
    <section className='flex flex-col w-full h-full mb-20 min-h-[60rem] max-w-[60rem] justify-center items-center'>
      <h1>Tracks</h1>
      <h3 className='w-full mb-20'>
        // hack for&nbsp;
        {/* <span>
          diversity & inclusion
        </span>
        <span>
          sustainability
        </span>
        <span>
          health & wellness
        </span> */}
      </h3>
      <TrackBlocks />
    </section>
  )
}
  