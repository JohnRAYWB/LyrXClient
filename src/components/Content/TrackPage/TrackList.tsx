import React from 'react';
import {trackDto} from "@/api/dto/track.dto";
import Track from "@/components/Content/TrackPage/Track";
import styles from "./styles/TrackList.module.css"
import {Divider} from "antd";

interface TrackListData {
    tracks: trackDto[]
}

const TrackList: React.FC<TrackListData> = ({tracks}) => {

    if(tracks.length === 0) {
        return <div className={styles.emptyList}>Here no added tracks yet</div>
    }

    return (
        <div>
            <div className={styles.main}>
                <p className={styles.index}>#</p>
                <p className={styles.name}>Track name</p>
                <p className={styles.artist}>Artist</p>
                <p className={styles.album}>Album</p>
            </div>
            <Divider style={{width: 50}} className={styles.divider}/>
            {tracks && tracks.map((track, index) =>
                <Track
                    index={index + 1}
                    key={index}
                    track={track}
                />
            )}
        </div>
    );
};

export default TrackList;