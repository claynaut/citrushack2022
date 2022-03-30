import { Element } from 'react-scroll'
import { Page } from '@/components/Page'
import Landing from '@/pages/sections/live-landing'
import Judges from '@/pages/sections/judges'
import Tracks from '@/pages/sections/tracks'
import Resources from '@/pages/sections/resources'
import Sponsors from '@/pages/sections/sponsors'
import Staff from '@/pages/sections/staff'
import Schedule from '@/pages/sections/schedule'
import { Wave } from '@/components/Wave'

export default function Live() {
  return (
    <Page title='Live'>
      <Element name='Countdown' className='flex justify-center px-4 w-full bg-gradient-to-b from-primary to-accent'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain'>
          <Landing />
        </span>
      </Element>
      <Wave type={3} bgColor='bg-accent' fillColor='accent-secondary'/>
      <Element name='Schedule' className='relative flex justify-center px-4 w-full bg-gradient-to-b from-accent-secondary to-accent'>
        <Schedule />
      </Element>
      <Wave bgColor='bg-accent' fillColor='primary'/>
      <Element name='Judges' className='relative flex justify-center px-4 w-full bg-gradient-to-b from-primary to-secondary'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain 2xl:bg-cover'>
          <Judges />
        </span>
      </Element>
      <Wave type={2} bgColor='secondary' fillColor='primary'/>
      <Element name='Tracks' className='flex justify-center px-4 w-full bg-primary'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain 2xl:bg-cover'>
          <Tracks />
        </span>
      </Element>
      <Wave type={2} bgColor='bg-primary' fillColor='accent'/>
      <Element name='Resources' className='flex justify-center px-4 w-full bg-accent'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain 2xl:bg-cover'>
          <Resources />
        </span>
      </Element>
      <Wave type={3} bgColor='bg-accent' fillColor='accent-secondary'/>
      <Element name='Sponsors' className='flex justify-center px-4 w-full bg-gradient-to-b from-accent-secondary to-accent'>
        <Sponsors />
      </Element>
      <Wave bgColor='bg-accent' fillColor='primary'/>
      <Element name='Staff' className='flex justify-center px-4 w-full bg-gradient-to-b from-primary to-secondary'>
        <span className='flex justify-center w-full bg-pattern bg-repeat bg-contain 2xl:bg-cover'>
          <Staff />
        </span>
      </Element>
    </Page>
  )
}
