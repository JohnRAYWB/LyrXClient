import React, {useState} from 'react';

import styles from "../../styles/TracksList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {ExportOutlined, ImportOutlined, LoadingOutlined} from "@ant-design/icons";
import {useAddTrackToAlbumMutation, useRemoveTrackFromAlbumMutation} from "@/store/api/AlbumApi";
import {notification} from "antd";
import useTextLength from "@/util/useTextLength";
import {useScoreLength} from "@/util/useScoreLength";

interface Param {
    track: trackDto,
    albumId?: string
    type: string
}

const TrackDirection: React.FC<Param> = ({track, albumId,type}) => {

    const [confirm, setConfirm] = useState(false)
    const [addTrack, {isLoading: addLoading}] = useAddTrackToAlbumMutation()
    const [removeTrack, {isLoading: removeLoading}] = useRemoveTrackFromAlbumMutation()

    const handleTrackDirection = () => {

        if(type === 'add') {
            addTrack({aId: albumId, track: track._id})
            setConfirm(false)
        }

        if(type === 'remove') {
            removeTrack({aId: track.album, track: track._id})
            setConfirm(false)
        }

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Changes add successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    const name = useTextLength(track.name[1], 15)
    const listens = useScoreLength(track.listens)
    const favorites = useScoreLength(track.favorites)

    return (
        <div className={styles.trackContainer}>
            <p className={styles.trackName}>{name}</p>
            <p className={styles.trackArtist}>{track.name[0]}</p>
            <div className={styles.trackScoreContainer}>
                <p className={styles.trackScoreTitle}>Favorites</p>
                <p className={styles.trackScoreCount}>{favorites}</p>
            </div>
            <div className={styles.trackScoreContainer}>
                <p className={styles.trackScoreTitle}>Listens</p>
                <p className={styles.trackScoreCount}>{listens}</p>
            </div>
            {addLoading || removeLoading ?
                <div className={styles.loadingContainer}>
                    <LoadingOutlined className={styles.loadingRed}/>
                </div>
                :
                <div className={styles.iconContainer}>
                    {confirm ?
                        <div className={styles.confirmContainer}>
                            <p className={styles.confirmTitle}>Confirm?</p>
                            <p onClick={handleTrackDirection} className={styles.confirmYes}>Yes</p>
                            <p onClick={() => setConfirm(!confirm)} className={styles.confirmNo}>No</p>
                        </div>
                        :
                        <>
                            {type === 'remove' ?
                                <ExportOutlined rotate={270} onClick={() => setConfirm(!confirm)} className={styles.icon}/>
                                :
                                null
                            }
                            {type === 'add' ?
                                <ImportOutlined rotate={270} onClick={() => setConfirm(!confirm)} className={styles.icon}/>
                                :
                                null
                            }
                        </>
                    }
                </div>
            }
        </div>
    );
};

export default TrackDirection;