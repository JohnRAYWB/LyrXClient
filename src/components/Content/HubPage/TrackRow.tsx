import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"

import {tracks} from "@/api/dto/tracks.entity"
import {usePreparedData} from "@/components/Content/components/usePreparedData";

const TrackRow = () => {

    const preparedData = usePreparedData(tracks, 'track')

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tracks</h1>
                <Link className={styles.link} href={'/pth/hub/track'}>See all</Link>
            </div>
            <Row items={preparedData}/>
        </div>
    );
};

export default TrackRow;