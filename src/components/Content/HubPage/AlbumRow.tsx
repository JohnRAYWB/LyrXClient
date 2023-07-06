import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"

import {albums} from "@/api/dto/tracks.entity"
import {usePreparedDataHub} from "@/util/usePreparedDataHub";
import {Carousel} from "antd";

const AlbumRow = () => {

    const preparedData = usePreparedDataHub(albums, 'album')

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Album</h1>
                <Link className={styles.link} href={'/pth/hub/album'}>See all</Link>
            </div>
            <div className={styles.rowContainer}>
                {preparedData.length > 5 ?
                    <>
                        <Carousel>
                            <Row items={preparedData.slice(0, 5)} type={'album'}/>
                            <Row items={preparedData.slice(5, 10)} type={'album'}/>
                        </Carousel>
                    </>
                    :
                    <Row items={preparedData} type={'album'}/>
                }
            </div>
        </div>
    );
};

export default AlbumRow;