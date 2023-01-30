import Head from 'next/head'
import ModelScene from '@/components/ModelScene';

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
        <div className='flex w-full h-full bg-gray-400'>
          <div className="relative flex justify-center w-full">
            <div className='w-full h-[100vh] items-center flex bg-gray-900'>
              <ModelScene modelId='Model' />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
