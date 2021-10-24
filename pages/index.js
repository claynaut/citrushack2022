import { Element } from 'react-scroll'
import { connectToDatabase } from '@/lib/mongodb'
import Page from '@/components/Page'
import Landing from '@/pages/landing'
import About from '@/pages/about'
import Tracks from '@/pages/tracks'
import Support from '@/pages/support'
import Sponsors from '@/pages/sponsors'
import Staff from '@/pages/staff'
import Faq from '@/pages/faq'

export default function Home() {
  return (
    <Page>
      <Element name='Home' className='flex justify-center w-full'>
        <Landing />
      </Element>
      <Element name='About' className='flex justify-center w-full'>
        <About />
      </Element>
      <Element name='Tracks' className='flex justify-center w-full'>
        <Tracks />
      </Element>
      <Element name='Support' className='flex justify-center w-full'>
        <Support />
      </Element>
      <Element name='Sponsors' className='flex justify-center w-full'>
        <Sponsors />
      </Element>
      <Element name='Staff' className='flex justify-center w-full'>
        <Staff />
      </Element>
      <Element name='FAQ' className='flex justify-center w-full'>
        <Faq />
      </Element>
    </Page>
  )
}

export async function getServerSideProps() {
  await connectToDatabase()

  return {
    props: {},
  }
}
