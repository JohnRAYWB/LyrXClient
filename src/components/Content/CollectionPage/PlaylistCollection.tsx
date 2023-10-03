import React from 'react';
import {Carousel} from "antd";

import styles from "./styles/Collection.module.css"
import {useFetchMostLikedPlaylistQuery} from "@/store/api/PlaylistApi";
import Row from "@/components/Content/components/Row";

interface PlaylistParams {
    children: React.ReactNode
}

const PlaylistCollection: React.FC<PlaylistParams> = ({children}) => {

    const {data: likedPlaylist, isLoading} = useFetchMostLikedPlaylistQuery()

    if(isLoading) {
        return <></>
    }

    const firstRow = likedPlaylist.slice(0, 5)
    const secondRow = likedPlaylist.slice(5, 10)

    return (
        <div className={styles.main}>
            <div className={styles.favoritesContainer}>
                <h1 className={styles.favoritesTitle}>Most popular playlists</h1>
                <div className={styles.favoritesItems}>
                    <Carousel style={{paddingBottom: 30}}>
                        <Row items={firstRow} type={'playlist'}/>
                        <Row items={secondRow} type={'playlist'}/>
                    </Carousel>
                </div>
            </div>
            <div className={styles.mainListContainer}>
                <h1 className={styles.listTitle}>Community playlists</h1>
                <div className={styles.listContainer}>{children}</div>
            </div>
        </div>
    );
};

export default PlaylistCollection;