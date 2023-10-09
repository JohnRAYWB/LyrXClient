import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

import styles from './styles/Element.module.css'
import useTextLength from "@/util/useTextLength";
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {selectTrackData, setCurrentTrack, setPlayPause} from "@/store/slice/player";
import {CaretRightOutlined, MenuUnfoldOutlined, PauseOutlined} from "@ant-design/icons";

interface element {
    item: trackDto | playlistDto | albumDto
    type: string
}

const Element: React.FC<element> = ({item, type}) => {

    const [showInfo, setShowInfo] = useState(false)

    const dispatch = useAppDispatch()
    const player = useAppSelector(selectTrackData)

    const router = useRouter()

    let folder = type
    if (type === 'track' && 'protectedDeletion' in item && item.protectedDeletion) {
        folder = 'album'
    }

    const handlePlayTrack = () => {
        dispatch(setCurrentTrack({
            tracksList: [item],
            currentTrack: item,
            currentIndex: 0,
            isPlaying: true,
        }))
    }

    const handlePlayCollection = () => {
        if ('tracks' in item && item.tracks.length !== 0) {
            dispatch(setCurrentTrack({
                collectionId: item._id,
                tracksList: item.tracks,
                currentTrack: item.tracks[0],
                currentIndex: 0,
                isPlaying: true,
            }))
        } else {
            return null
        }
    }

    const handlePlayPause = () => {
        if (player.isPlaying) {
            dispatch(setPlayPause(false))
        } else {
            dispatch(setPlayPause(true))
        }
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.imageContainer}
                onMouseOver={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
            >
                <Image
                    className={styles.image}
                    priority={true}
                    width={190}
                    height={190}
                    src={`http://localhost:4221/${folder}/${item.name[0]}/${item.image}`}
                    alt={'logo'}
                />
                {showInfo &&
                    <div className={styles.overlay}>
                        <div className={styles.showInfoContainer}>
                            {type === 'track' ?
                                item._id === player?.currentTrack?._id && player.isPlaying ?
                                    <PauseOutlined
                                        className={styles.playButton}
                                        onClick={handlePlayPause}
                                    />
                                    :
                                    <CaretRightOutlined
                                        className={styles.playButton}
                                        onClick={() => item._id !== player?.currentTrack?._id ? handlePlayTrack() : handlePlayPause()}
                                    />
                                :
                                item._id === player?.collectionId && player.isPlaying ?
                                    <PauseOutlined
                                        className={styles.playButton}
                                        onClick={handlePlayPause}
                                    />
                                    :
                                    <CaretRightOutlined
                                        className={styles.playButton}
                                        onClick={() => item._id !== player?.collectionId ? handlePlayCollection() : handlePlayPause()}
                                    />
                            }
                            {type !== 'track' && 'tracks' in item &&
                                <div className={styles.tracksCount}>
                                    <MenuUnfoldOutlined/>
                                    <p>{item.tracks.length}</p>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
            <div className={styles.textContainer} onClick={() => router.push(`/pth/hub/${type}/${item._id}`)}>
                <h1 className={styles.name}>{`${useTextLength(item.name[0], 10)} - ${useTextLength(item.name[1], 10)}`}</h1>
                <p className={styles.description}>{useTextLength(item.description || '', 25)}</p>
            </div>
        </div>
    );
};

export default Element;