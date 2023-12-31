import React from 'react';
import {PauseCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";

import styles from "@/components/Content/TrackPage/styles/Track.module.css";
import {trackDto} from "@/api/dto/track.dto";

interface Param {
    track: trackDto
    currentTrack: trackDto
    isPlaying: boolean
    handlePlay: Function
    handlePause: Function
}

const PlayPause: React.FC<Param> = ({track, currentTrack, isPlaying, handlePlay, handlePause}) => {

    return (
        track._id === currentTrack?._id ?
            isPlaying ?
                <PauseCircleOutlined className={styles.playButton} onClick={handlePause}/>
                :
                <PlayCircleOutlined className={styles.playButton} onClick={handlePause}/>
            :
            <PlayCircleOutlined className={styles.playButton} onClick={handlePlay}/>

    );
};

export default PlayPause;