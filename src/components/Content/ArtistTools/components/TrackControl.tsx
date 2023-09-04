import React, {useState} from 'react';

import styles from "../styles/TrackControl.module.css";
import {trackDto} from "@/api/dto/track.dto";
import {trackAudioPath} from "@/util/AudioPath";
import PreviewPlayer from "@/components/Player/PreviewPlayer";
import TrackControlElement from "@/components/Content/ArtistTools/components/TrackControlElement";
import {useAppSelector} from "@/hook/redux";
import {selectTrackData} from "@/store/slice/player";

interface Param {
    type: string
    edit: boolean
    album: string
    tracks: trackDto[]
}

const TrackControl: React.FC<Param> = ({type, edit, album, tracks}) => {

    const player = useAppSelector(selectTrackData)

    return (
        <div>
            <div className={styles.tracksList}>
                {tracks.map((track, index) =>
                    <TrackControlElement
                        key={track._id}
                        type={type}
                        edit={edit}
                        index={index}
                        album={album}
                        track={track}
                        currentTrack={player.currentTrack}
                        tracksList={tracks}
                        isPlaying={player.isPlaying}
                    />
                )}
            </div>
        </div>
    );
};

export default TrackControl;