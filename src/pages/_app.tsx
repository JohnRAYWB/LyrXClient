import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import React, {FC, ReactElement, ReactNode} from "react";
import {store, wrapper} from "@/store/store";
import {Provider} from "react-redux";
import {NextPage} from "next";

interface Props extends AppProps {
    Component: AppProps["Component"] & {
        getLayout: (page: React.ReactElement) => React.ReactNode
    }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const App = ({Component, pageProps}: AppPropsWithLayout) => {

    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(<Component {...pageProps}/>)
}

export default wrapper.withRedux(App)