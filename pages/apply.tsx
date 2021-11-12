import ProtectedPage from '@/components/ProtectedPage'
import ApplicationForm from '@/components/ApplicationForm'

export default function Apply() {
  return (
    <ProtectedPage title='Apply' restrictions={['signin', 'applied']}>
      <section className='flex w-full h-screen min-h-[68rem] items-center'>
        <ApplicationForm />
      </section>
    </ProtectedPage>
  )
}
