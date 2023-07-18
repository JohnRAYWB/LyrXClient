import React from 'react';
import {Carousel} from "antd";

import styles from "./styles/Collection.module.css"
import {useFetchMostLikedQuery} from "@/store/api/PlaylistApi";
import Collection from "@/components/Content/components/Collection";
import Row from "@/components/Content/components/Row";
import {playlistDto} from "@/api/dto/playlist.dto";

interface PlaylistParams {
    playlists: playlistDto[]
}

const PlaylistCollection: React.FC<PlaylistParams> = ({playlists}) => {

    const {data: likedPlaylist, isLoading: loadLiked} = useFetchMostLikedQuery()

    if(loadLiked) {
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
            {
                playlists.length === 0 ?
                    <p className={styles.notFound}>Playlist not found</p>
                    :
                    <Collection items={playlists} type={'playlist'}/>
            }
        </div>
    );
};

export default PlaylistCollection;