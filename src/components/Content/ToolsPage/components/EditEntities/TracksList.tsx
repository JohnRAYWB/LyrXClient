import React from 'react';

import styles from "../../styles/TracksList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import TrackRemove from "@/components/Content/ToolsPage/components/EditEntities/TrackRemove";

interface Param {
    tracks: trackDto[]
}

const TracksList: React.FC<Param> = ({tracks}) => {

    return (
        <div className={styles.container}>
            {tracks.map(track =>
                <TrackRemove track={track}/>
            )}
        </div>
    );
};

export default TracksList;