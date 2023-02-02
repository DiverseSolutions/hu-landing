import Head from 'next/head'
import ModelScene from '@/components/ModelScene';
import TicketFeature from '@/features/ticket/TicketFeature';
import BundleFeature from '@/features/bundle/BundleFeature';

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
        <div className="pb-16">
          <TicketFeature />
          <BundleFeature />
        </div>
      </main>
    </>
  )
}
