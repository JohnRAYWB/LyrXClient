import React from 'react';

import styles from "../styles/PlayerTracksList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import useTextLength from "@/util/useTextLength";
import {setCurrentTrack, setPlayPause} from "@/store/slice/player";
import {useAppDispatch} from "@/hook/redux";
import {CaretRightOutlined, PauseOutlined} from "@ant-design/icons";
import Image from "next/image";
import {albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";

interface Param {
    tracksList: trackDto[]
    currentTrack: trackDto
    isPlaying: boolean
    popup: boolean
}

const PlayerTracksList: React.FC<Param> = ({tracksList, currentTrack, isPlaying, popup}) => {

    const dispatch = useAppDispatch()

    const handlePlay = (track, currentIndex) => {
        dispatch(setCurrentTrack({
            tracksList: tracksList,
            currentIndex: currentIndex,
            currentTrack: track,
            isPlaying: true,
            isActive: true
        }))
        dispatch(setPlayPause(true))
    }
    const handlePause = () => {
        dispatch(setPlayPause(false))
    }

    return (
        <div className={popup ? styles.playerTracksListPopupContainer : styles.playerTracksListFooterContainer}>
            {tracksList.map((track, index) =>
                <div className={
                    track === currentTrack ?
                        popup ? styles.activePlayerTrackPopupContainer : styles.activePlayerTrackFooterContainer
                        :
                        popup ? styles.playerTrackPopupContainer : styles.playerTrackFooterContainer}>
                    <Image
                        className={styles.image}
                        width={20}
                        height={20}
                        priority={true}
                        src={track.protectedDeletion ? albumsTrackImagePath(track) : trackImagePath(track)}
                        alt={'track_logo'}
                    />
                    {isPlaying && track === currentTrack ?
                        <PauseOutlined className={styles.playPauseButton} onClick={handlePause}/>
                        :
                        <CaretRightOutlined className={styles.playPauseButton} onClick={() => handlePlay(track, index)}/>
                    }
                    <p>{useTextLength(track.name[0], 10)} - {useTextLength(track.name[1], 40)}</p>
                </div>
            )}
        </div>
    );
};

export default PlayerTracksList;