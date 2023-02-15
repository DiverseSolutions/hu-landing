import HomePage from '@/features/landing/HomePage';

const DEPLOYMENT_ENV = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV || 'prod'

if (DEPLOYMENT_ENV) {
  console.log(`${DEPLOYMENT_ENV} DEPLOYMENT ENV`)
}

export default function Home() {

  return (
    <>
      <main>
        {DEPLOYMENT_ENV === 'prod' ? <HomePage /> : <HomePage />}
      </main>
    </>
  )
}
