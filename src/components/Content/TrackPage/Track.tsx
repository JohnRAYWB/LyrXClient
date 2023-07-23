import React from 'react';
import Image from "next/image";
import {
    EllipsisOutlined,
    HeartFilled,
    HeartOutlined, LoadingOutlined,
    PauseOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {ConfigProvider, Divider, Dropdown, MenuProps, notification} from "antd";
import Link from "next/link";

import styles from "./styles/Track.module.css"
import {trackDto} from "@/api/dto/track.dto";
import useTextLength from "@/util/useTextLength";
import {
    useFetchProfileQuery,
    useAddTrackToUserCollectionMutation,
    useRemoveTrackFromUserCollectionMutation
} from "@/store/api/UserApi";

interface Track {
    track: trackDto
    index: number
}

const Track: React.FC<Track> = ({track, index}) => {

    const {data: user, isLoading} = useFetchProfileQuery()
    const [addTrack, {isLoading: addLoading}] = useAddTrackToUserCollectionMutation()
    const [removeTrack, {isLoading: removeLoading}] = useRemoveTrackFromUserCollectionMutation()

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

    const items: MenuProps['items'] = [
        {
            label: [
                (
                    user._id === track.artist ?
                        <Link href={`/pth/hub/profile`}>Go to artist</Link>
                        :
                        <Link href={`/pth/hub/users/${track.artist}`}>Go to artist</Link>
                )
            ],
            key: '0',
        },
        {
            label: 'Add to playlist',
            key: '1',
        }
    ];

    const handleAddTrack = () => {
        try {
            addTrack(track._id)

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Done!</p>,
                description: <p className={styles.notification}>Track added successfully</p>,
                placement: "bottomLeft",
                duration: 2
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleRemoveTrack = () => {
        try {
            removeTrack(track._id)

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Done!</p>,
                description: <p className={styles.notification}>Track removed successfully</p>,
                placement: "bottomLeft",
                duration: 2
            })
        } catch (e) {
            console.log(e)
        }
    }

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
                                            <HeartFilled onClick={handleRemoveTrack} className={styles.favIconFill}/>
                                        }
                                    </>
                                    :
                                    <>
                                        {addLoading ?
                                            <LoadingOutlined className={styles.loading}/>
                                            :
                                            <HeartOutlined onClick={handleAddTrack} className={styles.favIcon}/>
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
                            colorText: '#606060',
                            controlItemBgHover: "#303030",
                            boxShadowSecondary: "none"
                        }
                    }}>
                        <Dropdown placement="bottomRight" menu={{items}} trigger={['click']}>
                            <EllipsisOutlined className={styles.dots}/>
                        </Dropdown>
                    </ConfigProvider>
                </div>
            </div>
            <Divider style={{width: 50}} className={styles.divider}/>
        </div>
    );
};

export default Track;