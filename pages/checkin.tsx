import { ProtectedPage } from '@/components/Page'
import { CheckinForm } from '@/components/Form'

export default function CheckIn() {
  return (
    // change 'admin' to 'checkedIn' to open up form the day before
    <ProtectedPage title='Check-In' restrictions={['signin', 'qualified', 'admin']}>
      <CheckinForm />
    </ProtectedPage>
  )
}
