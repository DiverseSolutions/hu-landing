import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store';
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import AuthFeature from '@/features/auth/AuthFeature';

export default function App({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
      <AuthFeature />
      <ToastContainer />
    </Provider>
  )
}
