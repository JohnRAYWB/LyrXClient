import React from 'react';

import styles from "../styles/UserCollectionHeader.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import TrackList from "@/components/Content/TrackPage/TrackList";
import Collection from "@/components/Content/components/Collection";

interface Params {
    track: trackDto[]
    playlist: playlistDto[]
    album: albumDto[]
    setChildren: Function
}

export const CollectionCountsHead: React.FC<Params> = ({track, playlist, album, setChildren}) => {

    const handleTrack = () => {
        setChildren(<TrackList tracks={track}/>)
    }

    const handlePlaylist = () => {
        setChildren(<Collection items={playlist} type={'playlist'}/>)
    }

    const handleAlbum = () => {
        setChildren(<Collection items={album} type={'album'}/>)
    }

    return (
            <div className={styles.entitiesContainer}>
                <div onClick={handleTrack} className={styles.entityContainer}>
                    <p>Tracks</p>
                    <div className={styles.entityScore}>
                        <h1>{track.length}</h1>
                        <p>Total</p>
                    </div>
                </div>
                <div onClick={handlePlaylist} className={styles.entityContainer}>
                    <p>Playlist</p>
                    <div className={styles.entityScore}>
                        <h1>{playlist.length}</h1>
                        <p>Total</p>
                    </div>
                </div>
                <div onClick={handleAlbum} className={styles.entityContainer}>
                    <p>Albums</p>
                    <div className={styles.entityScore}>
                        <h1>{album.length}</h1>
                        <p>Total</p>
                    </div>
                </div>
            </div>
    );
};

export default CollectionCountsHead;