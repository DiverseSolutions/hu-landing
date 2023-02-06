import Head from 'next/head'
import LandingWithComingSoon from '@/features/landing/LandingWithComingSoon';
import ReleaseLandingWithComingSoon from '@/features/landing/ReleaseLandingWithComingSoon';

const DEPLOYMENT_ENV = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV || 'prod'

if (DEPLOYMENT_ENV) {
  console.log(`${DEPLOYMENT_ENV} DEPLOYMENT ENV`)
}

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
        {DEPLOYMENT_ENV === 'prod' ? <ReleaseLandingWithComingSoon /> : <LandingWithComingSoon />}
      </main>
    </>
  )
}
