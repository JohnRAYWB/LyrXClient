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
            title: 'Hub',
            description: 'Main page. Welcome to our music platform'
        },
        '/pth/hub/profile': {
            title: 'Profile',
            description: 'Look at you! You are awesome'
        },
        '/pth/hub/profile/collection': {
            title: 'Your collection',
            description: 'Collection of all your fav'
        },
        '/pth/hub/track': {
            title: 'Tracks',
            description: 'Bests friends for your mood'
        },
        '/pth/hub/playlist': {
            title: 'Playlists',
            description: 'Each user can share peace of own'
        },
        '/pth/hub/album': {
            title: 'Albums',
            description: 'Artists place for their music'
        },
        '/pth/hub/genre': {
            title: 'Genres',
            description: 'Billions of tracks for any genre'
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