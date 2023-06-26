import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {FC} from "react";
import {wrapper} from "@/store/store";
import {Provider} from "react-redux";

const App: FC<AppProps> = ({Component, ...rest}) => {
  const {store, props} = wrapper.useWrappedStore(rest)
  const {pageProps} = props
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  )
}

export default App