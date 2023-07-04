import React from 'react';
import styles from "./styles/Collection.module.css"
import {usePreparedPlaylistEntities} from "@/util/usePreparedDataEntity";
import {playlistDto} from "@/api/dto/playlist.dto";
import {Carousel} from "antd";
import Row from "@/components/Content/components/Row";
import Collection from "@/components/Content/components/Collection";

interface PlaylistCollection {
    playlists: playlistDto[]
}

const PlaylistCollection: React.FC<PlaylistCollection> = ({playlists}) => {

    const preparedData = usePreparedPlaylistEntities(playlists)
    const mostLiked = preparedData.sort((a, b) => b.favorites - a.favorites).slice(0, 10)

    return (
        <div className={styles.main}>
            <div className={styles.fav}>
                <p className={styles.favText}>Most popular playlists</p>
                <div className={styles.favItems}>
                    {mostLiked.length > 5 ?
                        <>
                            <Carousel>
                                <Row items={mostLiked.slice(0, 5)}/>
                                <Row items={mostLiked.slice(5, 10)}/>
                            </Carousel>
                        </>
                        :
                        <Row items={mostLiked}/>
                    }
                </div>
            </div>
            <p className={styles.listText}>Community playlists</p>
            <Collection items={preparedData}/>
        </div>
    );
};

export default PlaylistCollection;