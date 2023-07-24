import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import {Button, ConfigProvider, Divider, Input, notification, Popover} from "antd";
import {
    CaretRightOutlined,
    HeartFilled,
    HeartOutlined,
    InfoCircleOutlined,
    LoadingOutlined,
    PlusOutlined
} from "@ant-design/icons";

import styles from "@/styles/TrackPage.module.css"
import useTextLength from "@/util/useTextLength";
import {
    useAddTrackToUserCollectionMutation,
    useRemoveTrackFromUserCollectionMutation,
    useFetchTrackByIdQuery,
    useLeaveCommentMutation
} from "@/store/api/TrackApi";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import Comment from "@/components/Content/TrackPage/Comment";
import {handleAddTrack, handleRemoveTrack} from "@/util/handleTrackControl";

interface PageParams {
    trackId: string
}

const TrackPage: NextPageWithLayout<PageParams> = ({trackId}) => {

    const {data: track, isLoading: trackLoading} = useFetchTrackByIdQuery(trackId)
    const {data: user, isLoading: userLoading} = useFetchProfileQuery()
    const [leaveComment, {isLoading}] = useLeaveCommentMutation()
    const [addTrack, {isLoading: addLoading}] = useAddTrackToUserCollectionMutation()
    const [removeTrack, {isLoading: removeLoading}] = useRemoveTrackFromUserCollectionMutation()

    const [text, setText] = useState('')

    if (trackLoading || userLoading) {
        return <></>
    }

    let folder = 'track'
    track.protectedDeletion ? folder = 'album' : folder

    let descriptionLength = ''

    track.description ? descriptionLength = useTextLength(track.description, 240) : ''

    const textHandle = (e) => {
        setText(e.target.value)
    }

    return (
        <div className={styles.main}>
            <div className={styles.infoContainer}>
                <div className={styles.infoMain}>
                    <div className={styles.infoText}>
                        <h1 className={styles.trackOwnerText}>
                            {
                                track.artist._id === user._id ?
                                    <Link className={styles.link} href={`/pth/hub/profile`}>{track.name[0]}</Link>
                                    :
                                    <Link className={styles.link}
                                          href={`/pth/hub/users/${track.artist._id}`}>{track.name[0]}</Link>
                            }
                        </h1>
                        <h1 className={styles.trackNameText}>{track.name[1]}</h1>
                        <div className={styles.infoTextFooter}>
                            {track.album ?
                                <>
                                    <p className={styles.trackInfo}>
                                        ALBUM:
                                        <Link
                                            className={styles.link}
                                            href={`/pth/hub/album/${track.album._id}`}>
                                            {track.album.name[1]}
                                        </Link></p>

                                </>
                                :
                                null}
                            {
                                track.genre.length !== 0 ?
                                    <p className={styles.trackInfo}>
                                        GENRES:
                                        {track.genre.map((genre) =>
                                            <Link
                                                href={`/pth/hub/genre/${genre._id}`}
                                                key={genre._id}
                                                className={styles.link}>
                                                {genre.name}
                                            </Link>
                                        )}
                                    </p>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <Image
                        className={styles.image}
                        priority={true}
                        width={260}
                        height={260}
                        src={`http://localhost:4221/${folder}/${track.name[0]}/${track.image}`}
                        alt={'track_logo'}
                    />
                </div>
                <div className={styles.description}>
                    {
                        track.description && track.description.length > 240 ?
                            <>
                                <Popover overlayStyle={{width: 600}} content={track.description}>
                                    <InfoCircleOutlined/>
                                </Popover>
                                <p>DESCRIPTION: {descriptionLength}</p>
                            </>
                            :
                            null
                    }
                    {
                        track.description && track.description.length < 240 ?
                            <p>DESCRIPTION: {track.description}</p>
                            :
                            null
                    }
                </div>
                <div className={styles.scoresContainer}>
                    <div className={styles.scoresItem}>
                        <p className={styles.scoresItemLeft}>Favorites</p>
                        <p className={styles.scoresItemRight}>{track.favorites}</p>
                    </div>
                    <div>
                        {user.tracks.findIndex(t => t._id === track._id) === -1 ?
                            <div className={styles.actionButtons}>
                                {user.tracksCollection.findIndex(t => t._id === track._id) !== -1 ?
                                    <>
                                        {removeLoading ?
                                            <LoadingOutlined className={styles.loading}/>
                                            :
                                            <HeartFilled onClick={() => handleRemoveTrack(removeTrack, track._id)} className={styles.addButtonFill}/>
                                        }
                                    </>
                                    :
                                    <>
                                    {addLoading ?
                                        <LoadingOutlined className={styles.loading}/>
                                        :
                                        <HeartOutlined onClick={() => handleAddTrack(addTrack, track._id)} className={styles.addButtonEmpty}/>
                                    }
                                    </>
                                }
                                <CaretRightOutlined className={styles.addButtonEmpty}/>
                                <PlusOutlined className={styles.addButtonEmpty}/>
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className={styles.scoresItem}>
                        <p className={styles.scoresItemLeft}>{track.listens}</p>
                        <p className={styles.scoresItemRight}>Listens</p>
                    </div>
                </div>
            </div>
            <div className={styles.commentContainer}>
                <Divider style={{border: '#525252'}} orientation={"right"}>
                    <h1 className={styles.commentTitle}>Comments</h1>
                </Divider>
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
                                ghost
                                onClick={() => {
                                    if(text.length !== 0) {
                                        leaveComment({tId: trackId, text: text})
                                        notification.success({
                                            style: {backgroundColor: "#646464", width: 300},
                                            message: <p className={styles.notification}>Done!</p>,
                                            description: <p className={styles.notification}>Comment add successfully</p>,
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
                    <Divider style={{color: '#606060', border: '#232323FF', margin: '40px 0px'}}
                             orientation={"right"}>Reactions</Divider>
                    <div className={styles.commentList}>
                        {
                            track.comments.map(comment =>
                                <Comment comment={comment} user={user}/>
                            )
                        }
                    </div>
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
