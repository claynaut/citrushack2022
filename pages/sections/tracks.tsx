import { TrackBlocks } from '@/components/TrackBlocks'
import { Typing } from '@/components/Typing'

export function Tracks() {
  return (
    <section className='flex flex-col w-full h-full my-12 lg:my-0 max-w-[72rem] justify-center items-center'>
      <h1>Tracks</h1>
      <h2 className='w-full mb-20 text-center text-3xl sm:text-4xl md:text-5xl h-10 sm:h-auto'>
        <Typing
          base='// hack for'
          phrases={[
            'diversity & inclusion',
            'sustainability',
            'health & wellness'
          ]}
          delay={20}
          cursor
        />
      </h2>
      <TrackBlocks />
    </section>
  )
}
  