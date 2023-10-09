import React from 'react';

import styles from "../styles/TrackControl.module.css"
import {LoadingOutlined, PauseCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";
import useTextLength from "@/util/useTextLength";
import ScoreContainer from "@/components/Content/components/ScoreContainer";
import {trackDto} from "@/api/dto/track.dto";
import {useAddTrackToAlbumMutation, useRemoveTrackFromAlbumMutation} from "@/store/api/AlbumApi";
import {useAppDispatch} from "@/hook/redux";
import {setCurrentTrack, setPlayPause} from "@/store/slice/player";

interface Param {
    type: string
    index: number
    edit: boolean
    album: string
    track: trackDto
    currentTrack: trackDto
    tracksList: trackDto[]
    isPlaying: boolean
}

const TrackControlElement: React.FC<Param> = ({type, index, edit, album, track, currentTrack, tracksList, isPlaying}) => {

    const [addTrack, {isLoading: addLoading}] = useAddTrackToAlbumMutation()
    const [removeTrack, {isLoading: removeLoading}] = useRemoveTrackFromAlbumMutation()

    const dispatch = useAppDispatch()

    const handleAddTrack = () => {
        addTrack({aId: album, track: track._id})
    }

    const handleRemoveTrack = () => {
        removeTrack({aId: album, track: track._id})
    }

    const handlePlay = () => {
        dispatch(setCurrentTrack({tracksList: tracksList, currentIndex: index, currentTrack: track, isPlaying: true}))
        dispatch(setPlayPause(true))
    }
    const handlePause = () => {
        dispatch(setPlayPause(false))
    }

    return (
        <div className={styles.trackContainer}>
            <p className={styles.index}>{index + 1}</p>
            {isPlaying && track._id === currentTrack._id ?
                <PauseCircleOutlined className={styles.playButton} onClick={handlePause}/>
                :
                <PlayCircleOutlined className={styles.playButton} onClick={handlePlay}/>
            }
            <p className={styles.trackName}>{useTextLength(track.name[1], 15)}</p>
            <div className={styles.scoreContainer}>
                <ScoreContainer title={'Listens'} count={track.listens}/>
            </div>
            <div className={styles.scoreContainer}>
                <ScoreContainer title={'Favorites'} count={track.favorites}/>
            </div>
            {edit ?
                <>
                    {type === 'add' ?
                        <div className={styles.trackControlContainer}>
                            {addLoading ?
                                <LoadingOutlined className={styles.loadingSpinnerAdd}/>
                                :
                                <p onClick={handleAddTrack} className={styles.trackAddButton}>Add</p>
                            }
                        </div>
                        :
                        <div className={styles.trackControlContainer}>
                            {removeLoading ?
                                <LoadingOutlined className={styles.loadingSpinnerRemove}/>
                                :
                                <p onClick={handleRemoveTrack} className={styles.trackRemoveButton}>Remove</p>
                            }
                        </div>
                    }
                </>
                :
                null
            }
        </div>
    );
};

export default TrackControlElement;