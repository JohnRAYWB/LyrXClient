import React, {useState} from 'react';
import Image from "next/image";
import {
    EllipsisOutlined,
    HeartFilled,
    HeartOutlined, LoadingOutlined,
} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {ConfigProvider, Divider, Dropdown, MenuProps, message, Modal} from "antd";
import Link from "next/link";

import styles from "./styles/Track.module.css"
import {trackDto} from "@/api/dto/track.dto";
import useTextLength from "@/util/useTextLength";
import {
    useFetchProfileQuery
} from "@/store/api/UserApi";
import {
    useAddTrackToPlaylistMutation,
    useAddTrackToUserCollectionMutation,
    useRemoveTrackFromUserCollectionMutation
} from "@/store/api/TrackApi"
import {handleAddTrack, handleRemoveTrack} from "@/util/handleTrackControl";
import {albumsTrackImagePath, playlistImagePath, trackImagePath} from "@/util/ImagePath";
import {playlistDto} from "@/api/dto/playlist.dto";
import {useAppDispatch} from "@/hook/redux";
import {setCurrentTrack, setPlayPause} from "@/store/slice/player";
import PlayPause from "@/components/Content/TrackPage/components/PlayPause";

interface Track {
    track: trackDto
    tracksList: trackDto[]
    currentIndex: number
    currentTrack: trackDto
    isPlaying: boolean
}

const Track: React.FC<Track> = ({track, tracksList, currentTrack, currentIndex, isPlaying}) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPlaylist, setSelectedPlaylist] = useState<playlistDto>(null)

    const dispatch = useAppDispatch()

    const {data: user, isLoading} = useFetchProfileQuery()
    const [addTrack, {isLoading: addLoading}] = useAddTrackToUserCollectionMutation()
    const [removeTrack, {isLoading: removeLoading}] = useRemoveTrackFromUserCollectionMutation()
    const [addTrackToPlaylist, {isLoading: toPlaylistLoading}] = useAddTrackToPlaylistMutation()

    if (isLoading) {
        return <></>
    }

    const router = useRouter()

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleSubmitModal = () => {
        if (selectedPlaylist.tracks.findIndex(selectedTrack => selectedTrack._id === track._id) === -1) {
            addTrackToPlaylist({tId: track._id, playlist: selectedPlaylist._id})

            setModalOpen(false)
            setSelectedPlaylist(null)

            message.success('Track added successfully')
        } else {
            message.error('Something goes wrong. Maybe you have this track in playlist already')
        }

    }

    const handleCancelModal = () => {
        setSelectedPlaylist(null)
        setModalOpen(false)
    }

    const items: MenuProps['items'] = [
        {
            label: [
                (
                    user._id === track.artist._id ?
                        <Link href={`/pth/hub/profile`}>Go to artist</Link>
                        :
                        <Link href={`/pth/hub/users/${track.artist}`}>Go to artist</Link>
                )
            ],
            key: '0',
        },
        {
            label: <p onClick={handleOpenModal}>Add to Playlist</p>,
            key: '1',
        }
    ];

    const handlePlay = () => {
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
        <div>
            <div className={styles.container}>
                <div className={styles.mediaContainer}>
                    <p>{currentIndex + 1}</p>
                    <PlayPause
                        track={track}
                        currentTrack={currentTrack}
                        isPlaying={isPlaying}
                        handlePlay={handlePlay}
                        handlePause={handlePause}
                    />
                    <Image
                        className={styles.image}
                        priority={true}
                        width={45}
                        height={45}
                        src={track.protectedDeletion ? albumsTrackImagePath(track) : trackImagePath(track)}
                        alt={'track_log0'}
                    />
                </div>
                <div className={styles.trackContainer} onClick={() => router.push(`/pth/hub/track/${track._id}`)}>
                    <p className={styles.name}>{useTextLength(track.name[1], 20)}</p>
                    <p className={styles.artist}>{useTextLength(track.name[0], 20)}</p>
                    <p className={styles.album}>{track.album ? useTextLength(track.album.name[1], 20) : ''}</p>
                </div>
                <div className={styles.actionContainer}>
                    {user.tracks.findIndex(t => t._id === track._id) === -1 ?
                        <div>
                            {
                                user.tracksCollection.findIndex(t => t._id === track._id) !== -1 ?
                                    <>
                                        {removeLoading ?
                                            <LoadingOutlined className={styles.loading}/>
                                            :
                                            <HeartFilled onClick={() => handleRemoveTrack(removeTrack, track._id)}
                                                         className={styles.favIconFill}/>
                                        }
                                    </>
                                    :
                                    <>
                                        {addLoading ?
                                            <LoadingOutlined className={styles.loading}/>
                                            :
                                            <HeartOutlined onClick={() => handleAddTrack(addTrack, track._id)}
                                                           className={styles.favIcon}/>
                                        }
                                    </>
                            }
                        </div>
                        :
                        null
                    }
                    <ConfigProvider theme={{
                        token: {
                            colorBgElevated: '#232323',
                            colorPrimary: '#f64141',
                            colorText: '#606060',
                            controlItemBgHover: "#303030",
                            boxShadowSecondary: "none"
                        }
                    }}>
                        {toPlaylistLoading ?
                            <LoadingOutlined className={styles.loading}/>
                            :
                            <Dropdown placement="bottomRight" menu={{items}} trigger={['click']}>
                                <EllipsisOutlined className={styles.dots}/>
                            </Dropdown>
                        }
                        <Modal
                            title={'Select playlist'}
                            open={modalOpen}
                            onOk={handleSubmitModal}
                            onCancel={handleCancelModal}
                            width={695}
                            centered={true}
                        >
                            <div className={styles.playlistsContainer}>
                                {user.playlists.length !== 0 ?
                                    user.playlists.map(playlist =>
                                        <div key={playlist._id} onClick={() => setSelectedPlaylist(playlist)}
                                             className={
                                                 selectedPlaylist && selectedPlaylist._id === playlist._id ?
                                                     styles.selectedPlaylist
                                                     :
                                                     styles.playlistContainer
                                             }>
                                            <Image
                                                className={styles.playlistImage}
                                                width={115}
                                                height={115}
                                                priority={true}
                                                src={playlistImagePath(playlist)}
                                                alt={'playlist_logo'}
                                            />
                                            <p className={styles.playlistName}>{useTextLength(playlist.name[1], 10)}</p>
                                        </div>
                                    )
                                    :
                                    <p className={styles.emptyPlaylistTitle}>You don't have own playlists yet</p>
                                }
                            </div>
                        </Modal>
                    </ConfigProvider>
                </div>
            </div>
            <Divider style={{width: 50}} className={styles.divider}/>
        </div>
    );
};

export default Track;