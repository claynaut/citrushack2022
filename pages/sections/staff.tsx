import { TeamGrid } from '@/components/Team'

export default function Staff() {
  return (
    <section className='flex flex-col w-full h-full mb-20 min-h-[60rem] max-w-[60rem] justify-center items-center'>
      <h1 className='mb-16'>Our Team</h1>
      <TeamGrid />
    </section>
  )
}
