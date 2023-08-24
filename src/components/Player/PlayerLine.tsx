import React, {useEffect, useRef, useState} from 'react';
import WaveSurfer from "wavesurfer.js";

import styles from "./styles/FooterPlayer.module.css";
import {BackwardOutlined, CaretRightOutlined, ForwardOutlined, PauseOutlined, SoundOutlined} from "@ant-design/icons";
import {ConfigProvider, Popover} from "antd";
import {useAppDispatch} from "@/hook/redux";
import {setPlayPause} from "@/store/slice/player";

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
    isPlaying: boolean
}

const PlayerLine: React.FC<Param> = ({url, isPlaying}) => {

    const waveformRef = useRef(null)
    const waveSurfer = useRef(null)
    const [play, setPlay] = useState(isPlaying)
    const [volume, setVolume] = useState(1)
    const [duration, setDuration] = useState(null)
    const [currentTime, setCurrentTime] = useState(null)

    const dispatch = useAppDispatch()
    const formatTime = time => [Math.floor((time % 3600) / 60), ('00' + Math.floor(time % 60)).slice(-2)].join(':')

    useEffect(() => {
        const options = waveSurferOptions(waveformRef.current)
        waveSurfer.current = WaveSurfer.create(options)

        waveSurfer.current.load(url)
        waveSurfer.current.on('ready', () => setDuration(formatTime(waveSurfer.current.getDuration())))
        waveSurfer.current.on('audioprocess', () => setCurrentTime(formatTime(waveSurfer.current.getCurrentTime())))
        waveSurfer.current.on('finish', () => setPlay(false))

        if (waveSurfer.current) {
            waveSurfer.current.setVolume(volume)
            setVolume(volume)
        }

        return () => waveSurfer.current.destroy()
    }, [url])

    const handleVolumeChange = (e) => {
        const {target} = e
        const newVolume = +target.value

        if (newVolume) {
            setVolume(newVolume)
            waveSurfer.current.setVolume(newVolume || 1)
        }
    }

    const handlePlay = () => {
            dispatch(setPlayPause(true))
            waveSurfer.current.play()
    }

    const handlePause = () => {
            dispatch(setPlayPause(false))
            waveSurfer.current.pause()
    }

    return (
        <div className={styles.playerContainer}>
            <BackwardOutlined className={styles.icons}/>
            {isPlaying ?
                <PauseOutlined onClick={handlePause} className={styles.icons}/>
                :
                <CaretRightOutlined onClick={handlePlay} className={styles.icons}/>
            }
            <ForwardOutlined className={styles.icons}/>
            <div id={'waveform-time'} className={styles.time}>{currentTime ? currentTime : '0:00'}</div>
            <div className={styles.player} id={'waveform'} ref={waveformRef}/>
            <div id={'waveform-time'} className={styles.time}>{duration ? duration : '0:00'}</div>
            <ConfigProvider theme={{
                token: {
                    colorBgElevated: '#303030',
                }
            }}>
                <Popover
                    content={
                        <input type={"range"}
                               min={0} max={1}
                               step={0.1}
                               onChange={handleVolumeChange}
                               defaultValue={volume}
                               className={styles.volumeControl}
                        />
                    }
                >
                    <SoundOutlined className={styles.icons}/>
                </Popover>
            </ConfigProvider>
        </div>
    );
};



export default PlayerLine;