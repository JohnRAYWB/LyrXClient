import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"

import {playlists} from "@/api/dto/tracks.entity"
import {usePreparedDataHub} from "@/util/usePreparedDataHub";
import {Carousel} from "antd";

const PlaylistRow = () => {

    const preparedData = usePreparedDataHub(playlists, 'playlist')

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Playlist</h1>
                <Link className={styles.link} href={'/pth/hub/playlist'}>See all</Link>
            </div>
            <div className={styles.rowContainer}>
                <Carousel>
                    <Row items={preparedData.slice(0, 5)}/>
                    <Row items={preparedData.slice(5, 10)}/>
                </Carousel>
            </div>
        </div>
    );
};

export default PlaylistRow;