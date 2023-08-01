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
            <div className={styles.fav}>
                <p className={styles.favText}>Most popular playlists</p>
                <div className={styles.favItems}>
                    <Carousel>
                        <Row items={firstRow} type={'playlist'}/>
                        <Row items={secondRow} type={'playlist'}/>
                    </Carousel>
                </div>
            </div>
            <p className={styles.listText}>Community playlists</p>
            {children}
        </div>
    );
};

export default PlaylistCollection;