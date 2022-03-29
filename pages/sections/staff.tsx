import { TeamGrid } from '@/components/Team'

export default function Staff() {
  return (
    <section className='flex flex-col w-full h-full my-12 lg:my-0 max-w-[60rem] justify-center items-center'>
      <h1 className='mb-16'>Our Team</h1>
      <TeamGrid />
    </section>
  )
}
