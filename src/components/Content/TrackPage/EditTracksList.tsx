import React from 'react';

import styles from "./styles/EditTracksList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import EditTrack from "@/components/Content/TrackPage/EditTrack";

interface Param {
    tracks: trackDto[]
    type: string
    refetch: Function
}

const EditTracksList: React.FC<Param> = ({tracks, type, refetch}) => {

    const handleRefetch = () => {
        refetch()
    }

    return (
        <div>
            <button onClick={handleRefetch} className={styles.refetchButton}>Refetch</button>
            {tracks.map(track =>
                !track.protectedDeletion ?
                    <EditTrack
                        type={type}
                        key={track._id}
                        track={track}
                    />
                    :
                    null
            )}
        </div>
    );
};

export default EditTracksList;