import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import {Carousel} from "antd";
import styles from "./styles/HubRows.module.css"

import {useFetchMostLikedTrackQuery} from "@/store/api/TrackApi";

const TrackRow = () => {

    const {data: tracks, isLoading} = useFetchMostLikedTrackQuery()

    if (isLoading) {
        return <></>
    }

    const firstRow = tracks.slice(0, 5)
    const secondRow = tracks.slice(5, 10)

    return (
        tracks.length !== 0 ?
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Tracks</h1>
                    <Link className={styles.link} href={'/pth/hub/track'}>See all</Link>
                </div>
                <div className={styles.rowContainer}>
                    {tracks.length > 5 ?
                        <Carousel style={{paddingBottom: 30}}>
                            <Row items={firstRow} type={'track'}/>
                            <Row items={secondRow} type={'track'}/>
                        </Carousel>
                        :
                        <Row items={tracks} type={'track'}/>
                    }
                </div>
            </div>
            :
            null
    );
};

export default TrackRow;