import React from 'react';
import Link from "next/link";
import {Carousel} from "antd";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"
import {useFetchMostLikedPlaylistQuery} from "@/store/api/PlaylistApi";

const PlaylistRow = () => {

    const {data: playlists, isLoading} = useFetchMostLikedPlaylistQuery()

    if (isLoading) {
        return <></>
    }

    const firstRow = playlists.slice(0, 5)
    const secondRow = playlists.slice(5, 10)


    return (
        playlists.length !== 0 ?

            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Playlist</h1>
                    <Link className={styles.link} href={'/pth/hub/playlist'}>See all</Link>
                </div>
                <div className={styles.rowContainer}>
                    {playlists.length > 5 ?
                        <Carousel style={{paddingBottom: 30}}>
                            <Row items={firstRow} type={'playlist'}/>
                            <Row items={secondRow} type={'playlist'}/>
                        </Carousel>
                        :
                        <Row items={playlists} type={'playlist'}/>
                    }
                </div>
            </div>
            :
            null
    );
};

export default PlaylistRow;