import { JudgeGrid } from '@/components/Judges'

export default function Judges() {
  return (
    <section className='flex flex-col w-full h-full my-12 lg:my-0 max-w-[70rem] 2xl:max-w-[82rem] justify-center items-center'>
      <h1 className='mb-16'>Judges</h1>
      <JudgeGrid />
    </section>
  )
}
