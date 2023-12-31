import React, {useEffect, useState} from 'react';

import styles from "../styles/FooterPlayer.module.css"
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {
    selectTrackData,
    setChangeTrack,
    setCurrentTrack,
    setPlayPause,
} from "@/store/slice/player";
import PlayerTrackInfo from "@/components/Player/FooterPlayer/PlayerTrackInfo";
import Player from "@/components/Player/FooterPlayer/Player";
import PlayerControls from "@/components/Player/FooterPlayer/PlayerControls";
import PlayerPopovers from "@/components/Player/FooterPlayer/PlayerPopovers";
import PlayerTracksList from "@/components/Player/FooterPlayer/PlayerTracksList";
import {albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";

interface Param {
    popup: boolean
    setPopup: Function
}

const FooterPlayer: React.FC<Param> = ({popup, setPopup}) => {

    const player = useAppSelector(selectTrackData)
    const {collectionId, tracksList, currentIndex, currentTrack, isPlaying} = player

    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [volume, setVolume] = useState(0.5)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (tracksList.length) dispatch(setPlayPause(true));
    }, [currentIndex]);

    const handlePlayPause = () => {
        if (isPlaying) {
            dispatch(setPlayPause(false))
        } else {
            dispatch(setPlayPause(true))
        }
    }

    const handleNextTrack = () => {
        if (!shuffle) {
            dispatch(setChangeTrack((currentIndex + 1) % tracksList.length))
        } else {
            dispatch(setChangeTrack(Math.floor(Math.random() * tracksList.length)))
        }
    }

    const handlePrevTrack = () => {
        if (currentIndex === 0) {
            dispatch(setChangeTrack(tracksList.length - 1))
        } else if (shuffle) {
            dispatch(setChangeTrack(Math.floor(Math.random() * tracksList.length)))
        } else {
            dispatch(setChangeTrack((currentIndex - 1) % tracksList.length))
        }
    }

    const handleClosePlayer = () => {
        dispatch(setCurrentTrack({
            collectionId: null,
            tracksList: [],
            currentIndex: 0,
            currentTrack: null,
            isPlaying: false
        }))
    }

    return (
        <div className={popup ? styles.popupMainContainer : styles.mainContainer}>
            <div style={popup ?
                {
                    backgroundImage: `url(${currentTrack.protectedDeletion ? albumsTrackImagePath(currentTrack) : trackImagePath(currentTrack)})`,
                    filter: 'blur(6px) grayscale(25%)',
                    opacity: '75%'
                }
                :
                null}
                 className={popup ? styles.popupBackgroundImage : null}/>
            {popup ?
                <div className={styles.popupInfoContainer}>
                    <PlayerTrackInfo track={currentTrack} isPlaying={isPlaying} index={currentIndex} popup={popup}/>
                    <PlayerTracksList
                        collectionId={collectionId}
                        tracksList={tracksList}
                        currentTrack={currentTrack}
                        isPlaying={isPlaying}
                        popup={popup}
                    />
                </div>
                :
                <PlayerTrackInfo track={currentTrack} isPlaying={isPlaying} index={currentIndex} popup={popup}/>
            }

            <div className={popup ? styles.playerPopupContainer : styles.playerFooterContainer}>
                <PlayerControls
                    popup={popup}
                    isPlaying={isPlaying}
                    repeat={repeat}
                    setRepeat={setRepeat}
                    shuffle={shuffle}
                    setShuffle={setShuffle}
                    handlePlayPause={handlePlayPause}
                    handleNextTrack={handleNextTrack}
                    handlePrevTrack={handlePrevTrack}
                />
                <Player
                    popup={popup}
                    currentTrack={currentTrack}
                    volume={volume}
                    currentTime={currentTime}
                    duration={duration}
                    isPlaying={isPlaying}
                    repeat={repeat}
                    onEnded={handleNextTrack}
                    setCurrentTime={setCurrentTime}
                    setDuration={setDuration}
                />
            </div>
            <PlayerPopovers
                collectionId={collectionId}
                currentTrack={currentTrack}
                tracksList={tracksList}
                isPlaying={isPlaying}
                popup={popup}
                setPopup={setPopup}
                volume={volume}
                setVolume={setVolume}
                handleClosePlayer={handleClosePlayer}
            />
        </div>
    );
};

export default FooterPlayer;