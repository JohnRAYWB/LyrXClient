import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import {Button, ConfigProvider, Divider, Input, message, Modal, notification, Popover} from "antd";
import {
    CaretRightOutlined,
    HeartFilled,
    HeartOutlined,
    InfoCircleOutlined,
    LoadingOutlined, PauseOutlined,
    PlusOutlined, UserOutlined
} from "@ant-design/icons";

import styles from "@/styles/TrackPage.module.css"
import useTextLength from "@/util/useTextLength";
import {
    useAddTrackToUserCollectionMutation,
    useRemoveTrackFromUserCollectionMutation,
    useFetchTrackByIdQuery,
    useLeaveCommentMutation, useAddTrackToPlaylistMutation
} from "@/store/api/TrackApi";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import Comment from "@/components/Content/TrackPage/Comment";
import {handleAddTrack, handleRemoveTrack} from "@/util/handleTrackControl";
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {selectTrackData, setCurrentTrack, setPlayPause} from "@/store/slice/player";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumsTrackImagePath, playlistImagePath, trackImagePath} from "@/util/ImagePath";

interface PageParams {
    trackId: string
}

const TrackPage: NextPageWithLayout<PageParams> = ({trackId}) => {

    const {data: track, isLoading: trackLoading} = useFetchTrackByIdQuery(trackId)
    const {data: user, isLoading: userLoading} = useFetchProfileQuery()
    const [leaveComment, {isLoading}] = useLeaveCommentMutation()
    const [addTrack, {isLoading: addLoading}] = useAddTrackToUserCollectionMutation()
    const [removeTrack, {isLoading: removeLoading}] = useRemoveTrackFromUserCollectionMutation()
    const [addToPlaylist, {isLoading: addToPlaylistLoading}] = useAddTrackToPlaylistMutation()

    const [openModal, setOpenModal] = useState(false)
    const [selectedPlaylist, setSelectedPlaylist] = useState<playlistDto>(null)

    const [text, setText] = useState('')

    const dispatch = useAppDispatch()
    const player = useAppSelector(selectTrackData)

    if (trackLoading || userLoading) {
        return <></>
    }

    const textHandle = (e) => {
        setText(e.target.value)
    }

    const handleSubmitModal = () => {
        if (selectedPlaylist.tracks.findIndex(selectedTrack => selectedTrack._id === track._id) === -1) {
            addToPlaylist({tId: trackId, playlist: selectedPlaylist._id})

            setOpenModal(false)
            setSelectedPlaylist(null)

            message.success('Track added successfully')
        } else {
            message.error('Something goes wrong. Maybe you have this track in playlist already')
        }

    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedPlaylist(null)
    }

    const handlePlay = () => {
        dispatch(setCurrentTrack({
            tracksList: [track],
            currentIndex: 0,
            currentTrack: track,
            isPlaying: true,
        }))
        dispatch(setPlayPause(true))
    }
    const handlePause = () => {
        dispatch(setPlayPause(false))
    }

    return (
        <div className={styles.main}>
            <div className={styles.infoContainer}>
                <div className={styles.infoMain}>
                    <div className={styles.infoText}>
                        <h1 className={styles.trackOwnerText}>
                            {
                                track.artist._id === user._id ?
                                    <Link className={styles.link}
                                          href={`/pth/hub/profile`}>{useTextLength(track.name[0], 20)}</Link>
                                    :
                                    <Link className={styles.link}
                                          href={`/pth/hub/users/${track.artist._id}`}>{useTextLength(track.name[0], 20)}</Link>
                            }
                        </h1>
                        <h1 className={styles.trackNameText}>{useTextLength(track.name[1], 35)}</h1>
                        <div className={styles.infoTextFooter}>
                            {track.album ?
                                <>
                                    <div className={styles.trackInfo}>
                                        <p>ALBUM:</p>
                                        <Link
                                            className={styles.link}
                                            href={`/pth/hub/album/${track.album._id}`}>
                                            {track.album.name[1]}
                                        </Link>
                                    </div>

                                </>
                                :
                                null}
                            {
                                track.genre.length !== 0 ?
                                    <div className={styles.trackInfo}>
                                        <p>GENRES:</p>
                                        {track.genre.map((genre) =>
                                            <Link
                                                href={`/pth/hub/genre/${genre._id}`}
                                                key={genre._id}
                                                className={styles.link}>
                                                {genre.name}
                                            </Link>
                                        )}
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                        <Image
                            className={styles.image}
                            priority={true}
                            width={260}
                            height={260}
                            src={track.protectedDeletion ? albumsTrackImagePath(track) : trackImagePath(track)}
                            alt={'track_logo'}
                        />
                    </div>
                </div>
                {
                    track.description ?
                        track.description.length > 200 ?
                            <div className={styles.description}>
                                <Popover overlayStyle={{width: 600}} content={track.description}>
                                    <InfoCircleOutlined/>
                                </Popover>
                                <p>DESCRIPTION: {useTextLength(track.description, 200)}</p>
                            </div>
                            :
                            <div className={styles.description}>
                                <InfoCircleOutlined/>
                                <p>DESCRIPTION: {track.description}</p>
                            </div>
                        :
                        null
                }
                <div className={styles.scoresContainer}>
                    <div className={styles.scoresItem}>
                        <p className={styles.scoresItemLeft}>Favorites</p>
                        <p className={styles.scoresItemRight}>{track.favorites}</p>
                    </div>
                    <div className={styles.actionButtons}>
                        {user.tracks.findIndex(t => t._id === track._id) === -1 ?
                            <>
                                {user.tracksCollection.findIndex(t => t._id === track._id) !== -1 ?
                                    <>
                                        {removeLoading ?
                                            <LoadingOutlined className={styles.loading}/>
                                            :
                                            <HeartFilled onClick={() => handleRemoveTrack(removeTrack, track._id)}
                                                         className={styles.addButtonFill}/>
                                        }
                                    </>
                                    :
                                    <>
                                        {addLoading ?
                                            <LoadingOutlined className={styles.loading}/>
                                            :
                                            <HeartOutlined onClick={() => handleAddTrack(addTrack, track._id)}
                                                           className={styles.addButtonEmpty}/>
                                        }
                                    </>
                                }

                            </>
                            :
                            null
                        }
                        {player.isPlaying && player.currentTrack._id === track._id ?
                            <PauseOutlined className={styles.addButtonEmpty} onClick={handlePause}/>
                            :
                            <CaretRightOutlined className={styles.addButtonEmpty} onClick={handlePlay}/>
                        }
                        {addToPlaylistLoading ?
                            <LoadingOutlined className={styles.loading}/>
                            :
                            <PlusOutlined className={styles.addButtonEmpty} onClick={() => setOpenModal(true)}/>
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
                            <Modal
                                title={'Select Playlist'}
                                open={openModal}
                                onOk={handleSubmitModal}
                                onCancel={handleCloseModal}
                                width={695}
                                centered={true}
                            >
                                <div className={styles.playlistsContainer}>
                                    {user.playlists.map(playlist =>
                                        <div
                                            key={playlist._id}
                                            onClick={() => setSelectedPlaylist(playlist)}
                                            className={selectedPlaylist && selectedPlaylist._id === playlist._id ?
                                                styles.selectedPlaylist
                                                :
                                                styles.playlistContainer
                                            }
                                        >
                                            <Image
                                                className={styles.playlistImage}
                                                width={115}
                                                height={115}
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
                    <div className={styles.scoresItem}>
                        <p className={styles.scoresItemLeft}>{track.listens}</p>
                        <p className={styles.scoresItemRight}>Listens</p>
                    </div>
                </div>
            </div>
            <div className={styles.commentContainerEntities}>
                <div className={styles.commentInputContainer}>
                    <h1 className={styles.commentInputTitle}>Add comment</h1>
                    <ConfigProvider theme={{
                        token: {
                            colorBorder: '#232323FF',
                            colorTextPlaceholder: '#404040',
                            colorPrimary: '#ff2929',
                        }
                    }}>
                        <Input.TextArea
                            onChange={textHandle}
                            autoSize={true}
                            className={styles.commentInput}
                            placeholder={'Leave your comment'}
                            value={isLoading ? '' : text}
                        />
                        <Button
                            style={{color: '#606060', border: '1px solid #404040'}}
                            className={styles.commentButton}
                            ghost
                            onClick={() => {
                                if (text.length !== 0) {
                                    leaveComment({tId: trackId, text: text})
                                    notification.success({
                                        style: {backgroundColor: "#646464", width: 300},
                                        message: <p className={styles.notification}>Done!</p>,
                                        description: <p className={styles.notification}>Comment add
                                            successfully</p>,
                                        placement: "bottomLeft",
                                        duration: 2
                                    })
                                    setText('')
                                } else {
                                    notification.error({
                                        style: {backgroundColor: "#646464", width: 300},
                                        message: <p className={styles.notification}>Error!</p>,
                                        description: <p className={styles.notification}>Please input text</p>,
                                        placement: "bottomLeft",
                                        duration: 2
                                    })
                                }
                            }}
                        >
                            Leave comment
                        </Button>
                    </ConfigProvider>
                </div>
                <Divider style={{border: '#525252'}} orientation={"right"}>
                    <h1 className={styles.commentTitle}>Comments</h1>
                </Divider>
                <div className={styles.commentList}>
                    {track.comments.length !== 0 ?
                        track.comments.map(comment =>
                            <Comment key={comment._id} comment={comment} user={user}/>
                        )
                        :
                        <>
                            <div className={styles.emptyCommentHeader}>
                                <UserOutlined className={styles.emptyAvatar}/>
                                <p>Admin</p>
                            </div>
                            <p className={styles.emptyCommentTitle}>Seems like no one leave comment here. You can be the
                                first.</p>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

TrackPage.getLayout = (page: React.ReactNode) => <MainLayout name={'Track Page'}>{page}</MainLayout>

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if (!access_token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        return {
            props: {
                trackId: ctx.params.id
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default TrackPage;
