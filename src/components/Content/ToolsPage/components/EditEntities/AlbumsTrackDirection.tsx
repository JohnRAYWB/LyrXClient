import React from 'react';

import styles from "../../styles/TracksList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import TrackDirection from "@/components/Content/ToolsPage/components/EditEntities/TrackDirection";

interface Param {
    tracks: trackDto[]
    albumId?: string
    type: string
}

const AlbumsTrackDirection: React.FC<Param> = ({tracks, albumId, type}) => {

    if(type === 'add') {
        return (
            <div className={styles.container}>
                {tracks.map(track =>
                    <TrackDirection key={track._id} track={track} albumId={albumId} type={type}/>
                )}
            </div>
        )
    }

    if(type === 'remove') {
        return (
            <div className={styles.container}>
                {tracks.map(track =>
                    <TrackDirection key={track._id} track={track} type={type}/>
                )}
            </div>
        );
    }
};

export default AlbumsTrackDirection;