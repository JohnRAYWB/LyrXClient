import React from 'react';
import Row from "@/components/Content/components/Row";
import {tracks} from "@/api/dto/tracks.entity"
import styles from "./styles/TrackRow.module.css"
import Link from "next/link";

const TrackRow = () => {

    const preparedData = tracks
        .sort((a, b) => b.listens - a.listens)
        .map(track => ({image: track.image, name: track.name, description: track.description}))

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