import Head from 'next/head'
import Layout from '@/components/Layout'

interface Props {
  children: React.ReactNode | React.ReactNode[]
  title?: string
}

export default function Page({ title, children }: Props) {
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
