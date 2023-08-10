import React, {useEffect, useRef, useState} from 'react';

import styles from "./styles/PreviewPlayer.module.css"
import WaveSurfer from "wavesurfer.js";
import {PauseCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";

const waveSurferOptions = ref => ({
    container: ref,
    progressColor: '#F64141',
    cursorColor: 'F64141',
    barWidth: 2,
    barGap: 2,
    height: 25,
    responsive: true,
    normalize: true,
    partialRender: true
})

interface Param {
    url: string
}

const PreviewPlayer: React.FC<Param> = ({url}) => {

    const waveformRef = useRef(null)
    const waveSurfer = useRef(null)
    const [play, setPlay] = useState(false)
    const [duration, setDuration] = useState(null)
    const [currentTime, setCurrentTime] = useState(null)

    const formatTime = time => [Math.floor((time % 3600) / 60), ('00' + Math.floor(time % 60)).slice(-2)].join(':')

    useEffect(() => {
        setPlay(false)
        const options = waveSurferOptions(waveformRef.current)
        waveSurfer.current = WaveSurfer.create(options)

        waveSurfer.current.load(url)
        waveSurfer.current.on('ready', () => setDuration(formatTime(waveSurfer.current.getDuration())))
        waveSurfer.current.on('audioprocess', () => setCurrentTime(formatTime(waveSurfer.current.getCurrentTime())))
        waveSurfer.current.on('finish', () => setPlay(false))
        
        return () => waveSurfer.current.destroy()
    }, [url])

    const handlePlay = () => {
        setPlay(!play)
        waveSurfer.current.playPause()
    }

    return (
        <div className={styles.container}>
            {play ?
                <PauseCircleOutlined className={styles.playButton} onClick={handlePlay}/>
                :
                <PlayCircleOutlined className={styles.playButton} onClick={handlePlay}/>
            }
            <div id={'waveform-time'} className={styles.time}>{currentTime ? currentTime : '0:00'}</div>
            <div className={styles.player} id={'waveform'} ref={waveformRef}/>
            <div id={'waveform-time'} className={styles.time}>{duration ? duration : '0:00'}</div>
        </div>
    )
};

export default PreviewPlayer;