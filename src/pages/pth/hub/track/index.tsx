import React from 'react';
import TrackList from "@/components/Content/TrackPage/TrackList";
import styles from "@/styles/Track.module.css"
import {NextPage} from "next";

import {tracks} from "@/api/dto/tracks.entity"

const Index: NextPage = () => {

    return (
        <div className={styles.main}>
            <TrackList tracks={tracks}/>
        </div>
    );
};

Index.displayName = 'Tracks'
export default Index;