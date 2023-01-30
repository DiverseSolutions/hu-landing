import Head from 'next/head'
import { useState } from 'react'
import ModelPage from '@/components/ModelPage'
import classNames from 'classnames'


const models = ['Model', 'Model2']

export default function Home() {

  const [selectedModelId, setSelectedModelId] = useState<string>('Model')

  const handleSelectModelId = (modelId: string) => {
    setSelectedModelId(modelId);
  }

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
          <div className="flex justify-center w-full">
            <div className="container max-w-[1024px]">
              <div className='w-full h-[100vh] flex min-h-[50vh] items-center'>
                <div className='w-full h-full'>
                  {selectedModelId ? <ModelPage modelId={selectedModelId} /> : <></>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
