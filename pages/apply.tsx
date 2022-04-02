import { ProtectedPage } from '@/components/Page'
import { ApplicationForm } from '@/components/Form'

export default function Apply() {
  return (
    // add 'admin' to close apps and comment out form
    <ProtectedPage title='Apply' restrictions={['signin', 'applied', 'admin']}>
      {/* <ApplicationForm /> */}
    </ProtectedPage>
  )
}
