import React, {useState} from 'react';
import TrackList from "@/components/Content/TrackPage/TrackList";
import styles from "@/styles/Track.module.css"
import {useFetchAllAndSearchQuery} from "@/store/api/TrackApi";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const Index: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: tracks} = useFetchAllAndSearchQuery(query)

    return (
        <div className={styles.main}>
            <TrackList tracks={tracks}/>
        </div>
    );
};

Index.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Tracks'}>{page}</MainLayout>
}
export default Index;