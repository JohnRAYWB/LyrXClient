import React, {useEffect, useRef, useState} from 'react';

import styles from "@/components/Player/styles/Player.module.css";
import {trackDto} from "@/api/dto/track.dto";
import {trackAudioPath} from "@/util/AudioPath";
import WaveSurfer from "wavesurfer.js";
import {FastBackwardOutlined, FastForwardOutlined, StepBackwardOutlined, StepForwardOutlined} from "@ant-design/icons";
import {useIncrementListensMutation} from "@/store/api/TrackApi";

interface Param {
    popup: boolean
    currentTrack: trackDto
    volume: number
    duration: number
    currentTime: number
    isPlaying: boolean
    repeat: boolean
    onEnded: Function
    setCurrentTime: Function
    setDuration: Function
}

const Player: React.FC<Param> = ({
                                     popup,
                                     currentTrack,
                                     volume,
                                     duration,
                                     currentTime,
                                     isPlaying,
                                     repeat,
                                     onEnded,
                                     setCurrentTime,
                                     setDuration
                                 }) => {

    const ref = useRef(null)
    const wavesurfer = useRef(null)

    const [listened, setListened] = useState({currentTrack: null, state: false})
    const [incrementListens] = useIncrementListensMutation()

    const formatTime = time => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`
    console.log(listened)
    useEffect(() => {
        wavesurfer.current = WaveSurfer.create({
            container: ref.current,
            waveColor: 'rgba(30,30,30,0.8)',
            progressColor: 'white',
            cursorColor: 'inherit',
            barWidth: 3,
            barGap: 1,
            height: 25,
            normalize: true,
        })

        wavesurfer.current.load(trackAudioPath(currentTrack))

        wavesurfer.current.on('ready', () => {
            setDuration(wavesurfer.current.getDuration())
            wavesurfer.current.play()
        })

        wavesurfer.current.on('audioprocess', () => setCurrentTime(wavesurfer.current.getCurrentTime()))
        wavesurfer.current.on('click', () => setCurrentTime(wavesurfer.current.getCurrentTime()))
        wavesurfer.current.on('seeking', () => setCurrentTime(wavesurfer.current.getCurrentTime()))

        return () => wavesurfer.current.destroy()
    }, [currentTrack])

    if (wavesurfer.current) {
        if (isPlaying) {
            wavesurfer.current.play()
        } else {
            wavesurfer.current.pause()
        }
    }

    useEffect(() => {
        if (!repeat) {
            wavesurfer.current.on('finish', () => {
                setListened({currentTrack: currentTrack, state: true})
                return onEnded()
            })
        } else {
            wavesurfer.current.on('finish', () => {
                setListened({currentTrack: currentTrack, state: true})
                return wavesurfer.current.seekTo(0.0001)
            })
        }

    }, [currentTrack, repeat])

    useEffect(() => {
        if(listened.state) {
            incrementListens(listened.currentTrack._id)
            setListened({currentTrack: null, state: false})
        }
    }, [listened])

    useEffect(() => {
        wavesurfer.current.setVolume(volume)
    }, [volume])

    const handleFastForward = () => {
        wavesurfer.current.skip(30)
        setCurrentTime(wavesurfer.current.getCurrentTime())
    }

    const handleStepForward = () => {
        wavesurfer.current.skip(5)
        setCurrentTime(wavesurfer.current.getCurrentTime())
    }

    const handleFastBackward = () => {
        wavesurfer.current.skip(-30)
        setCurrentTime(wavesurfer.current.getCurrentTime())
    }

    const handleStepBackward = () => {
        wavesurfer.current.skip(-5)
        setCurrentTime(wavesurfer.current.getCurrentTime())
    }

    return (
        <div className={popup ? styles.seekBarPopupContainer : styles.seekBarFooterContainer}>
            <FastBackwardOutlined className={popup ? styles.seekButtons : null} onClick={handleFastBackward}/>
            <StepBackwardOutlined className={popup ? styles.seekButtons : null} onClick={handleStepBackward}/>
            <p style={popup ? {color: '#d0d0d0'} : null}>{currentTime === 0 ? '00:00' : formatTime(currentTime)}</p>
            <div className={styles.seekBarFooter} ref={ref}/>
            <p style={popup ? {color: '#d0d0d0'} : null}>{duration === 0 ? '00:00' : formatTime(duration)}</p>
            <StepForwardOutlined className={popup ? styles.seekButtons : null} onClick={handleStepForward}/>
            <FastForwardOutlined className={popup ? styles.seekButtons : null} onClick={handleFastForward}/>
        </div>
    )
};

export default Player;