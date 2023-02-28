import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { GOOGLE_ANALYTICS_ID } from '@/lib/consts'

const DEPLOYMENT_ENV = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV || 'prod'

export default function Document() {
  return (
    <Html lang="en" data-theme="the-hu">
      <Head />
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
        {DEPLOYMENT_ENV !== 'prod' ? (
          <>
            <script src="//widget.manychat.com/287810938508397.js" defer></script>
            <script src="https://mccdn.me/assets/js/widget.js" defer></script>
          </>
        ) : (<></>)}
      </body>
    </Html>
  )
}
