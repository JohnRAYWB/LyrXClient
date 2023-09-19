import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import React, {ReactElement, ReactNode} from "react";
import {wrapper} from "@/store/store";
import {NextPage} from "next";
import {parseCookies} from "nookies";
import * as Api from "@/api";
import {setUserData} from "@/store/slice/user";
import {setAuthToken} from "@/store/slice/auth";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const App = ({Component, pageProps}: AppPropsWithLayout) => {

    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(
        <Component {...pageProps}/>
    )
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ctx, Component}) => {

    try {
        const {access_token} = parseCookies(ctx)
        const userData = await Api.auth.getProfile(access_token)

        store.dispatch(setUserData(userData))
        store.dispatch(setAuthToken(access_token))
    } catch (e) {
        console.log(e)
    }

    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
        }
    }
})

export default wrapper.withRedux(App)