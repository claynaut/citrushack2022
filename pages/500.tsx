import { Page } from '@/components/Page'

export default function Error404() {
  return (
    <Page title='500'>
      <section className='flex w-full my-24 justify-center items-center text-center'>
        <div>
          <h1>500</h1>
          <p>
            Uh oh. Something broke on our end. Check back later.
          </p>
        </div>
      </section>
    </Page>
  )
}