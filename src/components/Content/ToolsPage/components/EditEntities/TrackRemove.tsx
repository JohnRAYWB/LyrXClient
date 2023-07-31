import React, {useState} from 'react';

import styles from "../../styles/TracksList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {ExportOutlined, LoadingOutlined} from "@ant-design/icons";
import {useRemoveTrackFromAlbumMutation} from "@/store/api/AlbumApi";
import {notification} from "antd";

interface Param {
    track: trackDto
}

const TrackRemove: React.FC<Param> = ({track}) => {

    const [confirm, setConfirm] = useState(false)
    const [removeTrack, {isLoading}] = useRemoveTrackFromAlbumMutation()

    const handleRemoveTrack = () => {
        removeTrack({aId: track.album, track: track._id})

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Artist changed successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    return (
        <div className={styles.trackContainer}>
            <p className={styles.trackName}>{track.name[1]}</p>
            <p className={styles.trackArtist}>{track.name[0]}</p>
            <div className={styles.trackScoreContainer}>
                <p className={styles.trackScoreTitle}>Favorites</p>
                <p className={styles.trackScoreCount}>{track.favorites}</p>
            </div>
            <div className={styles.trackScoreContainer}>
                <p className={styles.trackScoreTitle}>Listens</p>
                <p className={styles.trackScoreCount}>{track.listens}</p>
            </div>
            {isLoading ?
                <div className={styles.loadingContainer}>
                    <LoadingOutlined className={styles.loadingRed}/>
                </div>
                :
                <div className={styles.iconContainer}>
                    {confirm ?
                        <div className={styles.confirmContainer}>
                            <p className={styles.confirmTitle}>Confirm?</p>
                            <p onClick={handleRemoveTrack} className={styles.confirmYes}>Yes</p>
                            <p onClick={() => setConfirm(!confirm)} className={styles.confirmNo}>No</p>
                        </div>
                        :
                        <ExportOutlined onClick={() => setConfirm(!confirm)} className={styles.icon}/>
                    }
                </div>
            }
        </div>
    );
};

export default TrackRemove;