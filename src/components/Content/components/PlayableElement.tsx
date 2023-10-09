import React, {useState} from 'react';

import styles from "./styles/PlayableElement.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {selectTrackData, setCurrentTrack, setPlayPause} from "@/store/slice/player";
import {CaretRightOutlined, PauseOutlined} from "@ant-design/icons";
import useTextLength from "@/util/useTextLength";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface Param {
    track: trackDto
    tracksList: trackDto[]
    currentIndex: number
}

const PlayableElement: React.FC<Param> = ({track, tracksList, currentIndex}) => {

    const player = useAppSelector(selectTrackData)
    const [showPlay, setShowPlay] = useState(false)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const handleInitialPlay = () => {
        dispatch(setCurrentTrack({
            tracksList: tracksList,
            currentIndex: currentIndex,
            currentTrack: track,
            isPlaying: true,
        }))
        dispatch(setPlayPause(true))
    }

    const handlePlayPause = () => {
        if (player.isPlaying) {
            dispatch(setPlayPause(false))
        } else {
            dispatch(setPlayPause(true))
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div
                onMouseOver={() => setShowPlay(true)}
                onMouseLeave={() => setShowPlay(false)}
                className={styles.imageContainer}
            >
                <Image
                    className={styles.image}
                    width={75}
                    height={75}
                    priority={true}
                    src={track.protectedDeletion ? albumsTrackImagePath(track) : trackImagePath(track)}
                    alt={'track_logo'}
                />
                {showPlay &&
                    <div className={styles.overlay}>
                        {track._id === player?.currentTrack?._id ?
                            player.isPlaying ?
                                <PauseOutlined
                                    onClick={handlePlayPause}
                                    className={styles.button}
                                />
                                :
                                <CaretRightOutlined
                                    onClick={() => {
                                        handlePlayPause()
                                    }}
                                    className={styles.button}
                                />
                            :
                            <CaretRightOutlined
                                onClick={handleInitialPlay}
                                className={styles.button}
                            />}
                    </div>
                }
            </div>
            <div className={styles.nameContainer} onClick={() => router.push(`/pth/hub/track/${track._id}`)}>
                <p className={styles.trackName}>{useTextLength(track.name[1], 15)}</p>
                <p className={styles.artistName}>{useTextLength(track.name[0], 15)}</p>
            </div>
        </div>
    );
};

export default PlayableElement;