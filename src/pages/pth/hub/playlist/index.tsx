import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import PlaylistCollection from "@/components/Content/CollectionPage/PlaylistCollection";
import {useFetchAllPlaylistAndSearchQuery} from "@/store/api/PlaylistApi";
import Search from "@/components/screens/MainLayout/Sider/components/Search";

const Playlist: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: playlists, isLoading} = useFetchAllPlaylistAndSearchQuery(query)

    if(isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }
    return (
        <MainLayout name={'Playlists'} searchElement={<Search onChange={searchHandle}/>}>
            <PlaylistCollection playlists={playlists}/>
        </MainLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if (!access_token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default Playlist;