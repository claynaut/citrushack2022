import { Page } from '@/components/Page'

export default function Error500() {
  return (
    <Page title='500'>
      <section className='flex flex-col w-full my-24 justify-center items-center text-center'>
        <h1>500</h1>
        <p>
          Uh oh. Something broke on our end. Check back later.
        </p>
      </section>
    </Page>
  )
}