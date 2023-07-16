import React from 'react';
import Image from "next/image";
import styles from "@/styles/TrackPage.module.css"
import Link from "next/link";
import {Button, ConfigProvider, Divider, Input, Popover} from "antd";
import useTextLength from "@/util/useTextLength";
import {InfoCircleOutlined} from "@ant-design/icons";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useFetchByIdQuery} from "@/store/api/TrackApi";

interface PageParams {
    trackId: string
}

const TrackPage: NextPageWithLayout<PageParams> = ({trackId}) => {

    const {data: track, isLoading} = useFetchByIdQuery(trackId)

    if(isLoading) {
        return <></>
    }

    let folder = 'track'
    track.protectedDeletion ? folder = 'album' : folder

    let descriptionLength = ''

    track.description ? descriptionLength = useTextLength(track.description, 240) : ''

    return (
        <div className={styles.main}>
            <div className={styles.infoContainer}>
                <div className={styles.infoMain}>
                    <div className={styles.infoText}>
                        <h1 className={styles.trackOwnerText}>
                            <Link
                                className={styles.link}
                                href={`/pth/hub/profile/${track.artist._id}`}>{track.name[0]}</Link>
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
                                        {track.genre.map((genre, index) =>
                                            <Link
                                                href={`/pth/hub/genre/${genre._id}`}
                                                key={index}
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
                    <div className={styles.scoresItem}>
                        <p className={styles.scoresItemLeft}>Listens</p>
                        <p className={styles.scoresItemRight}>{track.listens}</p>
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
                            <Input.TextArea autoSize={true} className={styles.commentInput}
                                            placeholder={'Leave your comment'}/>
                            <Button style={{color: '#606060', border: '1px solid #404040'}} ghost>Leave comment</Button>
                        </ConfigProvider>
                    </div>
                    <Divider style={{color: '#606060', border: '#232323FF', margin: '40px 0px'}}
                             orientation={"right"}>Reactions</Divider>
                    <div className={styles.commentList}>
                        {
                            track.comments.map(comment =>
                                <div
                                    key={comment._id}
                                    className={styles.commentItem}
                                >
                                    <Divider style={{color: "white", border: "#343434"}} orientation={"left"}>
                                        <Link
                                            href={`/pth/hub/profile/${comment.user._id}`}
                                            className={styles.link}
                                        >
                                            {comment.user.username}
                                        </Link>
                                    </Divider>
                                    <p className={styles.comment}>{comment.text}</p>
                                </div>
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

        if(!access_token) {
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
