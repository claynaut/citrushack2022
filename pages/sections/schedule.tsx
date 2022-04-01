import { MasterSchedule } from '@/components/Schedule'

export default function Schedule() {
  return (
    <section className='flex flex-col w-full h-full my-12 lg:my-0 max-w-[72rem] justify-center items-center'>
      <h1 className='text-center'>Tentative Schedule</h1>
      <p className='text-center italic'><span className='font-semibold'>Note:</span> All times are in PST (Pacific Standard Time)</p>
      <MasterSchedule />
    </section>
  )
}
