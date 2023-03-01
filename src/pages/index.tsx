import HomePage from '@/features/landing/HomePage';
import HomePageV2 from '@/features/landing/HomePageV2';

const DEPLOYMENT_ENV = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV || 'prod'

if (DEPLOYMENT_ENV) {
  console.log(`${DEPLOYMENT_ENV} DEPLOYMENT ENV`)
}

export default function Home() {

  return (
    <>
      <main>
        {DEPLOYMENT_ENV === 'prod' ? <HomePage /> : <HomePageV2 />}
      </main>
    </>
  )
}
