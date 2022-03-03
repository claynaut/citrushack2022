import { TrackBlocks } from '@/components/TrackBlocks'
import { Typing } from '@/components/Typing'

export default function Tracks() {
  return (
    <section className='flex flex-col w-full h-full mb-20 min-h-[60rem] max-w-[60rem] justify-center items-center'>
      <h1>Tracks</h1>
      <h3 className='w-full mb-20'>
        <Typing
          base='// hack for'
          phrases={[
            'diversity & inclusion',
            'sustainability',
            'health & wellness'
          ]}
          delay={15}
          cursor
        />
      </h3>
      <TrackBlocks />
    </section>
  )
}
  