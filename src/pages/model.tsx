import Head from 'next/head'

import ModelScene from '@/components/ModelScene'

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
        <div className="mt-32"><ModelScene modelId='LHC' /></div>
      </main>
    </>
  )
}
