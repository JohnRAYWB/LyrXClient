import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"

import {albums} from "@/api/dto/tracks.entity"
import {usePreparedData} from "@/components/Content/components/usePreparedData";

const AlbumRow = () => {

    const preparedData = usePreparedData(albums, 'album')

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Album</h1>
                <Link className={styles.link} href={'/pth/hub/album'}>See all</Link>
            </div>
            <Row items={preparedData}/>
        </div>
    );
};

export default AlbumRow;