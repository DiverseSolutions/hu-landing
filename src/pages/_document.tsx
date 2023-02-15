import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { GOOGLE_ANALYTICS_ID } from '@/lib/consts'
import HuOgImg from '@/assets/img/hu-og.jpg'

export default function Document() {
  return (
    <Html lang="en" data-theme="the-hu">
      <Head>
        <title>hu.rocks</title>
        <meta property="og:title" content="The HU" />
        <meta property="og:image" content={HuOgImg.src} />
        <meta property="og:image:width" content={HuOgImg.width.toString()} />
        <meta property="og:image:height" content={HuOgImg.height.toString()} />
      </Head>
      <body>
        <Main />
        <NextScript />
        {GOOGLE_ANALYTICS_ID ? <Script async strategy={'afterInteractive'} src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}></Script> : <></>}
        {GOOGLE_ANALYTICS_ID ? (
          <Script id="hu-google-analytics" strategy={'afterInteractive'}>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
          </Script>
        ) : (<></>)}
      </body>
    </Html>
  )
}
