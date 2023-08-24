import React from 'react';
import {PauseCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";

import styles from "@/components/Content/TrackPage/styles/Track.module.css";
import {trackDto} from "@/api/dto/track.dto";

interface Param {
    track: trackDto
    activeTrack: trackDto
    isPlaying: boolean
    handlePlay: Function
    handlePause: Function
}

const PlayPause: React.FC<Param> = ({track, activeTrack, isPlaying, handlePlay, handlePause}) => {
    return (
        isPlaying && track._id === activeTrack._id ?
            <PauseCircleOutlined className={styles.playButton} onClick={handlePause}/>
            :
            <PlayCircleOutlined className={styles.playButton} onClick={handlePlay}/>

    );
};

export default PlayPause;