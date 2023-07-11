import React, {useState} from 'react';
import TrackList from "@/components/Content/TrackPage/TrackList";
import styles from "@/styles/Track.module.css"
import {NextPage} from "next";
import {useFetchAllAndSearchQuery} from "@/store/reducer/TrackApi";

const Index: NextPage = () => {

    const [query, setQuery] = useState('')
    const {data: tracks} = useFetchAllAndSearchQuery(query)

    return (
        <div className={styles.main}>
            <TrackList tracks={tracks}/>
        </div>
    );
};

Index.displayName = 'Tracks'
export default Index;