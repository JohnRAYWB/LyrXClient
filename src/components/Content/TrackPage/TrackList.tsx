import React from 'react';
import {trackDto} from "@/api/dto/track.dto";
import Track from "@/components/Content/TrackPage/Track";
import styles from "./styles/TrackList.module.css"
import {Divider} from "antd";

interface TrackList {
    tracks: trackDto[]
}

const TrackList: React.FC<TrackList> = ({tracks}) => {
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
                    key={track._id}
                    track={track}
                />
            )}
        </div>
    );
};

export default TrackList;