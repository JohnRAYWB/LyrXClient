import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"

import {tracks} from "@/api/dto/tracks.entity"
import {usePreparedDataHub} from "@/util/usePreparedDataHub";
import {Carousel} from "antd";

const TrackRow = () => {

    const preparedData = usePreparedDataHub(tracks, 'track')

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tracks</h1>
                <Link className={styles.link} href={'/pth/hub/track'}>See all</Link>
            </div>
            <div className={styles.rowContainer}>
                {preparedData.length > 5 ?
                    <>
                        <Carousel>
                            <Row items={preparedData.slice(0, 5)} type={'track'}/>
                            <Row items={preparedData.slice(5, 10)} type={'track'}/>
                        </Carousel>
                    </>
                    :
                    <Row items={preparedData} type={'track'}/>
                }
            </div>
        </div>
    );
};

export default TrackRow;