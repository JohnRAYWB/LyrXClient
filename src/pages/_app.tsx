import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {FC} from "react";
import {wrapper} from "@/store/store";
import {Provider} from "react-redux";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {usePathname} from "next/navigation";

const App: FC<AppProps> = ({Component, ...rest}) => {

    const {store, props} = wrapper.useWrappedStore(rest)
    const {pageProps} = props
    const pathName = usePathname()
    const unwrappedPages = ['/', '/pth/auth']

    const pagesNames = {
        '/pth/hub': 'Hub',
        '/pth/hub/track': 'Tracks',
        '/pth/hub/playlist': 'Playlists',
        '/pth/hub/album': 'Albums',
    }

    return (
        <Provider store={store}>
            {!unwrappedPages.includes(pathName) ?
                <MainLayout name={`${pagesNames[pathName]} | LyrX`}>
                    <style>{'body {background-color: #060606}'}</style>
                <Component {...pageProps} />
                </MainLayout>
                :
                <Component {...pageProps} />
            }
        </Provider>
    )
}

export default App