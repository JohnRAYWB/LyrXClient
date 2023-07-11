import React from 'react';
import Link from "next/link";
import {Carousel} from "antd";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"
import {useFetchMostLikedQuery} from "@/store/reducer/PlaylistApi";

const PlaylistRow = () => {

    const {data: firstLiked} = useFetchMostLikedQuery(0)
    const {data: secondLiked} = useFetchMostLikedQuery(5)

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Playlist</h1>
                <Link className={styles.link} href={'/pth/hub/playlist'}>See all</Link>
            </div>
            <div className={styles.rowContainer}>
                <Carousel>
                    <Row items={firstLiked} type={'playlist'}/>
                    <Row items={secondLiked} type={'playlist'}/>
                </Carousel>
            </div>
        </div>
    );
};

export default PlaylistRow;