import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import {Carousel} from "antd";
import styles from "./styles/HubRows.module.css"

import {useFetchMostLikedQuery} from "@/store/api/TrackApi";

const TrackRow = () => {

    const {data: trackFirst} = useFetchMostLikedQuery(0)
    const {data: trackSecond} = useFetchMostLikedQuery(5)

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tracks</h1>
                <Link className={styles.link} href={'/pth/hub/track'}>See all</Link>
            </div>
            <div className={styles.rowContainer}>
                <Carousel>
                    <Row items={trackFirst} type={'track'}/>
                    <Row items={trackSecond} type={'track'}/>
                </Carousel>
            </div>
        </div>
    );
};

export default TrackRow;