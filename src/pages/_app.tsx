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

    const pagesProps = {
        '/pth/hub': {
            title: 'Hub'
        },
        '/pth/hub/profile': {
            title: 'Profile',
        },
        '/pth/hub/profile/collection': {
            title: 'Your collection',
        },
        '/pth/hub/track': {
            title: 'Tracks',
        },
        '/pth/hub/playlist': {
            title: 'Playlists',
        },
        '/pth/hub/album': {
            title: 'Albums',
        },
    }

    return (
        <Provider store={store}>
            {!unwrappedPages.includes(pathName) ?
                <MainLayout pageProps={pagesProps[pathName]}>
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