import React, {useState} from 'react';

import styles from "../styles/TrackControl.module.css";
import {trackDto} from "@/api/dto/track.dto";
import {trackAudioPath} from "@/util/AudioPath";
import PreviewPlayer from "@/components/Player/PreviewPlayer";
import TrackControlElement from "@/components/Content/ArtistTools/components/TrackControlElement";

interface Param {
    type: string
    edit: boolean
    album: string
    tracks: trackDto[]
}

const TrackControl: React.FC<Param> = ({type, edit, album, tracks}) => {

    const [trackUrl, setTrackUrl] = useState<string>(null)

    const handlePlay = (track) => {
        setTrackUrl(() => trackAudioPath(track))
    }

    return (
        <div>
            <div className={styles.tracksList}>
                {tracks.map((track, index) =>
                    <TrackControlElement
                        key={track._id}
                        type={type}
                        edit={edit}
                        index={index + 1}
                        album={album}
                        track={track}
                        handlePlay={handlePlay}/>
                )}
            </div>
            {trackUrl ?
                <div className={styles.playerContainer}>
                    <PreviewPlayer url={trackUrl}/>
                </div>
                :
                null
            }
        </div>
    );
};

export default TrackControl;