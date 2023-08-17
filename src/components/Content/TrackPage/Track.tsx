import React, {useState} from 'react';
import Image from "next/image";
import {
    EllipsisOutlined,
    HeartFilled,
    HeartOutlined, LoadingOutlined,
    PauseOutlined,
    PlayCircleOutlined
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
import {playlistImagePath} from "@/util/ImagePath";
import ScoreContainer from "@/components/Content/components/ScoreContainer";

interface Track {
    track: trackDto
    index: number
}

const Track: React.FC<Track> = ({track, index}) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPlaylist, setSelectedPlaylist] = useState<string>(null)

    const {data: user, isLoading} = useFetchProfileQuery()
    const [addTrack, {isLoading: addLoading}] = useAddTrackToUserCollectionMutation()
    const [removeTrack, {isLoading: removeLoading}] = useRemoveTrackFromUserCollectionMutation()
    const [addTrackToPlaylist, result] = useAddTrackToPlaylistMutation()

    if (isLoading) {
        return <></>
    }

    const router = useRouter()

    const artistLength = useTextLength(track.name[0], 20)
    const trackLength = useTextLength(track.name[1], 20)
    let albumLength = ''

    track.album ? albumLength = useTextLength(track.album.name[1] || '', 20) : ''

    let folder = 'track'
    if (track.protectedDeletion) {
        folder = 'album'
    }

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleSubmitModal = () => {

        addTrackToPlaylist({tId: track._id, playlist: selectedPlaylist})

        setModalOpen(false)
        setSelectedPlaylist(null)
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
    console.log(result)
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.mediaContainer}>
                    <p>{index}</p>
                    {
                        true ?
                            <PlayCircleOutlined className={styles.playButton}/>
                            :
                            <PauseOutlined className={styles.playButton}/>
                    }
                    <Image
                        className={styles.image}
                        priority={true}
                        width={45}
                        height={45}
                        src={`http://localhost:4221/${folder}/${track.name[0]}/${track.image}`}
                        alt={'track_log0'}
                    />
                </div>
                <div className={styles.trackContainer} onClick={() => router.push(`/pth/hub/track/${track._id}`)}>
                    <p className={styles.name}>{trackLength}</p>
                    <p className={styles.artist}>{artistLength}</p>
                    <p className={styles.album}>{albumLength}</p>
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
                        <Dropdown placement="bottomRight" menu={{items}} trigger={['click']}>
                            <EllipsisOutlined className={styles.dots}/>
                        </Dropdown>
                        <Modal
                            title={'Select playlist'}
                            open={modalOpen}
                            onOk={handleSubmitModal}
                            onCancel={handleCancelModal}
                            width={695}
                            centered={true}
                        >
                            <div className={styles.playlistsContainer}>
                                {user.playlists.map(playlist =>
                                    <div key={playlist._id} onClick={() => setSelectedPlaylist(playlist._id)}
                                         className={
                                             selectedPlaylist && selectedPlaylist === playlist._id ?
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
                                )}
                            </div>
                        </Modal>
                    </ConfigProvider>
                </div>
            </div>
            <Divider style={{width: 50}} className={styles.divider}/>
            {result.isSuccess && message.success(result.data)}
            {result.isError && message.error(result.error.data)}
        </div>
    );
};

export default Track;