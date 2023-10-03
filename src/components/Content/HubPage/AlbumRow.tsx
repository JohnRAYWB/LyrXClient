import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"
import {Carousel} from "antd";
import {useFetchMostLikedAlbumQuery} from "@/store/api/AlbumApi";

const AlbumRow = () => {

    const {data: albums, isLoading} = useFetchMostLikedAlbumQuery()

    if (isLoading) {
        return <></>
    }

    const firstRow = albums.slice(0, 5)
    const secondRow = albums.slice(5, 10)

    return (
        albums.length !== 0 ?
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Album</h1>
                    <Link className={styles.link} href={'/pth/hub/album'}>See all</Link>
                </div>
                <div className={styles.rowContainer}>
                    {albums.length > 5 ?
                        <Carousel style={{paddingBottom: 30}}>
                            <Row items={firstRow} type={'album'}/>
                            <Row items={secondRow} type={'album'}/>
                        </Carousel>
                        :
                        <Row items={albums} type={'album'}/>
                    }
                </div>
            </div>
            :
            null
    );
};

export default AlbumRow;