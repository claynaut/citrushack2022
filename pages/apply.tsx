import { ProtectedPage } from '@/components/Page'
import { ApplicationForm } from '@/components/Form'

export default function Apply() {
  return (
    <ProtectedPage title='Apply' restrictions={['signin', 'applied']}>
      <ApplicationForm />
    </ProtectedPage>
  )
}
