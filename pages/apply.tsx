import ProtectedPage from '@/components/ProtectedPage'
import ApplicationForm from '@/components/ApplicationForm'

export default function Apply() {
  return (
    <ProtectedPage title='Apply' restrictions={['signin', 'applied']}>
      <ApplicationForm />
    </ProtectedPage>
  )
}
