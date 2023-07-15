import React, {useState} from 'react';
import TrackList from "@/components/Content/TrackPage/TrackList";
import styles from "@/styles/Track.module.css"
import {useFetchAllAndSearchQuery} from "@/store/api/TrackApi";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";

const Track: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: tracks} = useFetchAllAndSearchQuery(query)

    return (
        <div className={styles.main}>
            <TrackList tracks={tracks}/>
        </div>
    );
};

Track.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Tracks'}>{page}</MainLayout>
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if(!access_token) {
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