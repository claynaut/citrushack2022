import { Page } from '@/components/Page'
import { ButtonLink } from '@/components/ButtonLink'

export default function Error404() {
  return (
    <Page title='404'>
      <section className='flex flex-col w-full my-24 justify-center items-center text-center'>
        <h1>404</h1>
        <p className='mb-10'>
          The page you&apos;re looking for does not exist.
        </p>
        <ButtonLink
          primary
          label='Go Back to Homepage'
          link='/'
        />
      </section>
    </Page>
  )
}