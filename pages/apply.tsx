import Page from '@/components/Page'
import ApplicationForm from '@/components/ApplicationForm'

export default function Apply() {
  return (
    <Page title='Apply'>
      <section className='flex w-full h-screen min-h-[68rem] items-center'>
        <ApplicationForm />
      </section>
    </Page>
  )
}
