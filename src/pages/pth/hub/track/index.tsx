import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import {useFetchAllAndSearchQuery} from "@/store/api/TrackApi";
import TrackList from "@/components/Content/TrackPage/TrackList";
import styles from "@/styles/Track.module.css"
import Search from "@/components/screens/MainLayout/Sider/components/Search";

const Track: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: tracks, isLoading} = useFetchAllAndSearchQuery(query)

    if (isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Tracks'} searchElement={<Search onChange={searchHandle}/>}>
            <div className={styles.main}>
                <TrackList tracks={tracks}/>
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