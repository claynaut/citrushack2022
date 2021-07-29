import Head from 'next/head'
import { connectToDatabase } from '../lib/mongodb'

import Layout from '../components/Layout'
import Landing from '../pages/landing'

export default function Home() {
  return (
    <>
      <Head>
        <title>Citrus Hack</title>
        <meta name="description" content="Citrus Hack, a 36-hour hackathon hosted at University of California, Riverside." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Landing />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  return {
    props: { },
  }
}
