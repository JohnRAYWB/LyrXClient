import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"

import {playlists} from "@/api/dto/tracks.entity"
import {usePreparedData} from "@/components/Content/components/usePreparedData";

const PlaylistRow = () => {

    const preparedData = usePreparedData(playlists, 'playlist')

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Playlist</h1>
                <Link className={styles.link} href={'/pth/hub/playlist'}>See all</Link>
            </div>
            <Row items={preparedData}/>
        </div>
    );
};

export default PlaylistRow;