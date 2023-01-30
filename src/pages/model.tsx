import Head from 'next/head'

import HomePage from '@/components/ModelPage'

export default function Home() {
  return (
    <>
      <Head>
        <title>hu.rocks</title>
        <meta name="description" content="HU" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomePage modelId='Model2' />
      </main>
    </>
  )
}
