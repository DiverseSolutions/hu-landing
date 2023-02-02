import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store';
import { Provider } from 'react-redux'
import Navbar from '@/components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import AuthLoader from '@/components/AuthLoader';

export default function App({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Navbar />
      <AuthLoader>
        <Component {...props.pageProps} />
      </AuthLoader>
      <ToastContainer />
    </Provider>
  )
}
