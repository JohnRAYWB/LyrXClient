import React, {useEffect, useState} from 'react';
import styles from "../styles/UserCollectionHeader.module.css"
import TrackList from "@/components/Content/TrackPage/TrackList";
import Collection from "@/components/Content/components/Collection";
import {trackDto} from "@/api/dto/track.dto";
import {albumDto} from "@/api/dto/album.dto";

interface Params {
    track: trackDto[]
    album: albumDto[]
    setChildren: Function
}

const ArtistHeader: React.FC<Params> = ({track, album, setChildren}) => {

    const handleOwnTrack = () => {
        setChildren(<TrackList tracks={track}/>)
    }

    const handleOwnAlbum = () => {
        setChildren(<Collection items={album} type={'album'}/>)
    }

    return (
        <div className={styles.artistContainer}>
            <p className={styles.title}>Artist</p>
            <div className={styles.artistEntitiesContainer}>
                <div className={styles.artistEntitiesElems}>
                    <div onClick={handleOwnTrack} className={styles.artistEntityContainer}>
                        <p>Tracks</p>
                        <h1 className={styles.entityScore}>{track.length}</h1>
                        <p>Total</p>
                    </div>
                    <div onClick={handleOwnAlbum} className={styles.artistEntityContainer}>
                        <p>Albums</p>
                        <h1 className={styles.entityScore}>{album.length}</h1>
                        <p>Total</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistHeader;