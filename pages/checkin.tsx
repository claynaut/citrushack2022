import { ProtectedPage } from '@/components/Page'
import { CheckinForm } from '@/components/Form'

export default function Apply() {
  return (
    <ProtectedPage title='Check-In' restrictions={['signin', 'admin']}>
      <CheckinForm />
    </ProtectedPage>
  )
}
