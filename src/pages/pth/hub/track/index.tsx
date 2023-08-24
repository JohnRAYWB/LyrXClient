import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import {useFetchAllTrackAndSearchQuery, useFetchAllTracksQuery} from "@/store/api/TrackApi";
import TrackList from "@/components/Content/TrackPage/TrackList";
import styles from "@/styles/Track.module.css"
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import Pagination from "@/util/Pagination";

const Track: NextPageWithLayout = () => {

    const [page, setPage] = useState(0)
    const [query, setQuery] = useState(null)

    const {data: searchingTracks, isLoading: searchLoading, isFetching: fetchingSearch} = useFetchAllTrackAndSearchQuery(query)
    const {data: tracks, isLoading: trackLoading, isFetching: fetchingAll} = useFetchAllTracksQuery(page)

    if (searchLoading || trackLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Tracks'} searchElement={<Search onChange={searchHandle}/>}>
            <div className={styles.main}>
                {
                    query ?
                        <TrackList fetchingSearch={fetchingSearch} tracks={searchingTracks}/>
                        :
                        <Pagination page={page} setPage={setPage} isFetching={fetchingAll} children={<TrackList tracks={tracks}/>}/>
                }
            </div>
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

export default Track;