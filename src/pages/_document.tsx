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
            <script src="//widget.manychat.com/100771372950041.js" defer></script>
            <script src="https://mccdn.me/assets/js/widget.js" defer></script>
          </>
        ) : (<></>)}
        {DEPLOYMENT_ENV === 'prod' ? (
          <>
            <Script id="hu-facebook-pixel" strategy='afterInteractive'>
              {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '748893529928638');
          fbq('track', 'PageView');`}
            </Script>
          </>
        ) : (<></>)}
      </body>
    </Html>
  )
}
