import { MasterSchedule } from '@/components/Schedule'

export default function Schedule() {
  return (
    <section className='flex flex-col w-full h-full my-12 lg:my-0 max-w-[72rem] justify-center items-center'>
      <h1>Tentative Schedule</h1>
      <MasterSchedule />
    </section>
  )
}
