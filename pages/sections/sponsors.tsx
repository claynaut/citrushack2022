import { SponsorsGrid } from '@/components/Sponsors'
import { ButtonLink } from '@/components/ButtonLink'

export function Sponsors() {
  return (
    <section className='flex flex-col w-full h-full max-w-[60rem] my-12 lg:my-0 justify-center items-center'>
      <h1 className='text-center'>Our Sponsors</h1>
      <p className='mb-12 text-center'>
        Thank you to all of those who made this hackathon possible!
      </p>
      <ButtonLink
        primary
        link='/citrushack-2022-sponsorship-packet.pdf'
        label='Sponsor Us'
        external
      />
      <SponsorsGrid />
    </section>
  )
}
