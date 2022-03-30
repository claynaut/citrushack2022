import { ProtectedPage } from '@/components/Page'
import { CheckinForm } from '@/components/Form'

export default function CheckIn() {
  return (
    <ProtectedPage title='Check-In' restrictions={['signin', 'qualified', 'checkedIn']}>
      <CheckinForm />
    </ProtectedPage>
  )
}
