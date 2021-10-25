import Head from 'next/head'
import Layout from '@/components/Layout'

export default function Container({ title, children }) {
  return (
    <Layout>
      <Head>
        <title>Citrus Hack 2022 { title && ('| ' + title) }</title>
      </Head>
      <section className='flex flex-col w-full'>
        {children}
      </section>
    </Layout>
  )
}
