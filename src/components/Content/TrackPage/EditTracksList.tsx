import React from 'react';

import styles from "./styles/EditTracksList.module.css.module.css"
import {trackDto} from "@/api/dto/track.dto";
import EditTrack from "@/components/Content/TrackPage/EditTrack";

interface Param {
    tracks: trackDto[]
}

const EditTracksList: React.FC<Param> = ({tracks}) => {
    return (
        <div>
            {tracks.map(track =>
                !track.protectedDeletion ?
                    <EditTrack
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