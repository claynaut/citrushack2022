import Page from '@/components/Page'

export default function Error404() {
  return (
    <Page title='Verify Sign In'>
      <section className='flex flex-col w-full my-24 justify-center items-center text-center'>
        <h1>Verify Sign In</h1>
        <p className='max-w-lg'>
          Check your email for a verification request to sign in to Citrus Hack.
          Once you&apos;ve verified your email, feel free to close this tab.
        </p>
        <p className='max-w-lg'>
          Still can&apos;t find an email from us? Make sure you used the correct email to sign in.
        </p>
      </section>
    </Page>
  )
}