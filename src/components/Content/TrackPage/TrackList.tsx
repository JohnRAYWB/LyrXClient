import React from 'react';
import {Divider} from "antd";

import styles from "./styles/TrackList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import Track from "@/components/Content/TrackPage/Track";
import {LoadingOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {resetTracksList, selectTrackData} from "@/store/slice/player";

interface TrackListData {
    tracks: trackDto[]
    fetchingSearch?: boolean
}

const TrackList: React.FC<TrackListData> = ({tracks, fetchingSearch}) => {

    if(fetchingSearch) {
        return <div className={styles.emptyListContainer}>
            <p className={styles.emptyList}>Searching track</p>
            <LoadingOutlined className={styles.emptyList}/>
        </div>
    }

    if(tracks.length === 0) {
        return <div className={styles.emptyList}>Here no added tracks yet</div>
    }

    const player = useAppSelector(selectTrackData)

    return (
        <div>
            <div className={styles.main}>
                <p className={styles.index}>#</p>
                <div className={styles.titles}>
                    <p className={styles.name}>Track name</p>
                    <p className={styles.artist}>Artist</p>
                    <p className={styles.album}>Album</p>
                </div>
                <p className={styles.actions}>Actions</p>
            </div>
            <Divider style={{width: 50}} className={styles.divider}/>
            {tracks && tracks.map((track, index) =>
                <Track
                    key={track._id}
                    track={track}
                    tracksList={tracks}
                    currentIndex={index}
                    currentTrack={player.currentTrack}
                    isPlaying={player.isPlaying}
                />
            )}
        </div>
    );
};

export default TrackList;