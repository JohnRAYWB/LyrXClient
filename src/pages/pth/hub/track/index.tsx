import React from 'react';
import TrackList from "@/components/Content/TrackPage/TrackList";
import styles from "@/styles/Track.module.css"

import {tracks} from "@/api/dto/tracks.entity"

const Index = () => {

    return (
        <div className={styles.main}>
            <TrackList tracks={tracks}/>
        </div>
    );
};

export default Index;