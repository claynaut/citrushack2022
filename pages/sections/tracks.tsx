import TypeAnimation from 'react-type-animation'
import { TrackBlocks } from '@/components/TrackBlocks'

export default function Tracks() {
  return (
    <section className='flex flex-col w-full h-full mb-20 min-h-[60rem] max-w-[60rem] justify-center items-center'>
      <h1>Tracks</h1>
      <div className='flex w-full mb-20'>
        <TypeAnimation
          cursor={true}
          sequence={[
            '// hack for diversity & inclusion',
            2000,
            '// hack for sustainability',
            1000,
            '// hack for health & wellness',
            1000
          ]}
          className='text-lg sm:text-2xl font-semibold'
          repeat={Infinity}
        />
      </div>
      <TrackBlocks />
    </section>
  )
}
  