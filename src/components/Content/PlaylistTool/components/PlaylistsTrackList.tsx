import React from 'react';
import styles from "@/components/Content/PlaylistTool/styles/UsersPlaylists.module.css";
import {
    CaretRightOutlined,
    CloseOutlined,
    HeartFilled,
    HeartOutlined,
    LoadingOutlined,
    PauseOutlined
} from "@ant-design/icons";
import Image from "next/image";
import {albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";
import useTextLength from "@/util/useTextLength";
import {trackDto} from "@/api/dto/track.dto";
import {userDto} from "@/api/dto/user.dto";
import {
    useAddTrackToUserCollectionMutation,
    useRemoveTrackFromPlaylistMutation,
    useRemoveTrackFromUserCollectionMutation
} from "@/store/api/TrackApi";
import {setCurrentTrack, setPlayPause} from "@/store/slice/player";
import {useAppDispatch} from "@/hook/redux";

interface Param {
    track: trackDto
    currentTrack: trackDto
    tracksList: trackDto[]
    playlistId: string
    user: userDto
    index: number
    isPlaying: boolean
}

const PlaylistsTrackList: React.FC<Param> = ({track, currentTrack, tracksList, playlistId, user, index, isPlaying}) => {

    const [addTrack, {isLoading: addLoading}] = useAddTrackToUserCollectionMutation()
    const [removeTrack, {isLoading: removeLoading}] = useRemoveTrackFromUserCollectionMutation()
    const [removeFromPlaylist, {isLoading: removeFromPlaylistLoading}] = useRemoveTrackFromPlaylistMutation()

    const dispatch = useAppDispatch()

    const handlePlay = () => {
        dispatch(setCurrentTrack({tracksList: tracksList, currentIndex: index, currentTrack: track, isPlaying: true}))
        dispatch(setPlayPause(true))
    }
    const handlePause = () => {
        dispatch(setPlayPause(false))
    }

    return (
        <div className={styles.trackContainer}>
            <div className={styles.trackMediaContainer}>
                <p>{index + 1}</p>
                {isPlaying && currentTrack._id === track._id ?
                    <PauseOutlined onClick={handlePause}/>
                    :
                    <CaretRightOutlined onClick={handlePlay}/>
                }
                <Image
                    className={styles.trackImage}
                    width={50}
                    height={50}
                    priority={true}
                    src={track.protectedDeletion ? albumsTrackImagePath(track) : trackImagePath(track)}
                    alt={'track_logo'}
                />
            </div>
            <div>
                <p>{useTextLength(track.name[1], 10)}</p>
            </div>
            <div>
                {track.album ?
                    <p>{useTextLength(track.album.name[1], 10)}</p>
                    :
                    null
                }
            </div>
            <div className={styles.actionsContainer}>
                {user.tracksCollection.findIndex(uTrack => uTrack._id === track._id) === -1 ?
                    addLoading ?
                        <div className={styles.actionContainer}>
                            <LoadingOutlined className={styles.loadingAdd}/>
                        </div>
                        :
                        <div className={styles.actionContainer}>
                            <HeartOutlined className={styles.heartAdd} onClick={() => addTrack(track._id)}/>
                        </div>
                    :
                    removeLoading ?
                        <div className={styles.actionContainer}>
                            <LoadingOutlined className={styles.loadingRemove}/>
                        </div>
                        :
                        <div className={styles.actionContainer}>
                            <HeartFilled className={styles.heartRemove} onClick={() => removeTrack(track._id)}/>
                        </div>
                }
                {user.playlists.findIndex(playlist => playlist._id === playlistId) !== -1 ?
                    removeFromPlaylistLoading ?
                        <div className={styles.actionContainer}>
                            <LoadingOutlined className={styles.loadingRemove}/>
                        </div>
                        :
                        <CloseOutlined onClick={() => removeFromPlaylist({tId: track._id, playlist: playlistId})}
                                       className={styles.removeTrackButton}/>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default PlaylistsTrackList;