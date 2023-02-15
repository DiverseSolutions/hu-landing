import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store';
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import HuOgImg from '@/assets/img/hu-og.jpg'


import { ToastContainer } from 'react-toastify';
import AuthFeature from '@/features/auth/AuthFeature';
import Head from 'next/head';

import { APP_HOST_URL } from '@/lib/consts'

export default function App({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Head>
        <title>hu.rocks</title>
        <meta property="og:title" content="The HU in the Metaverse" />
        <meta property="og:description" content="Join the legendary band The HU for their first-ever virtual concert in the Metaverse!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={`${APP_HOST_URL}/${HuOgImg.src}`} />
        <meta property="og:image:width" content={HuOgImg.width.toString()} />
        <meta property="og:image:height" content={HuOgImg.height.toString()} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content={`${APP_HOST_URL}/${HuOgImg.src}`}></meta>
      </Head>
      <Provider store={store}>
        <Component {...props.pageProps} />
        <AuthFeature />
        <ToastContainer />
      </Provider>
    </>
  )
}
