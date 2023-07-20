import React from 'react';
import Link from "next/link";
import {Carousel} from "antd";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"
import {useFetchMostLikedPlaylistQuery} from "@/store/api/PlaylistApi";

const PlaylistRow = () => {

    const {data: playlists, isLoading} = useFetchMostLikedPlaylistQuery()

    if(isLoading) {
        return <></>
    }

    const firstRow = playlists.slice(0, 5)
    const secondRow = playlists.slice(5, 10)


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Playlist</h1>
                <Link className={styles.link} href={'/pth/hub/playlist'}>See all</Link>
            </div>
            <div className={styles.rowContainer}>
                <Carousel>
                    <Row items={firstRow} type={'playlist'}/>
                    <Row items={secondRow} type={'playlist'}/>
                </Carousel>
            </div>
        </div>
    );
};

export default PlaylistRow;