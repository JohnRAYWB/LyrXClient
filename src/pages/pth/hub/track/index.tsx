import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import {
    useFetchAllTrackAndSearchQuery,
    useFetchAllTracksQuery,
    useFetchMostListensTrackQuery
} from "@/store/api/TrackApi";
import TrackList from "@/components/Content/TrackPage/TrackList";
import styles from "@/styles/Track.module.css"
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import Pagination from "@/util/Pagination";
import {useAppDispatch} from "@/hook/redux";
import {resetTracksList} from "@/store/slice/player";
import TopListenedTracks from "@/components/Content/TrackPage/TopListenedTracks";

const Track: NextPageWithLayout = () => {

    const [page, setPage] = useState(0)
    const [query, setQuery] = useState(null)

    const {data: searchingTracks, isLoading: searchLoading, isFetching: fetchingSearch} = useFetchAllTrackAndSearchQuery(query)
    const {data: tracks, isLoading: trackLoading, isFetching: fetchingAll} = useFetchAllTracksQuery(page)
    const {data: mostListened, isLoading: mostListenedLoading} = useFetchMostListensTrackQuery()

    if (searchLoading || trackLoading || mostListenedLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    const dispatch = useAppDispatch()

    if(fetchingAll) {
        dispatch(resetTracksList(tracks))
    }

    return (
        <MainLayout name={'Tracks'} searchElement={<Search onChange={searchHandle}/>}>
            <div className={styles.main}>
                <TopListenedTracks tracksList={mostListened}/>
                <div className={styles.tracksMainContainer}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>Recently added</h1>
                    </div>
                    <div className={styles.tracksContainer}>
                        {
                            query ?
                                <TrackList fetchingSearch={fetchingSearch} tracks={searchingTracks}/>
                                :
                                <Pagination page={page} setPage={setPage} isFetching={fetchingAll} children={<TrackList tracks={tracks}/>}/>
                        }
                    </div>
                </div>
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