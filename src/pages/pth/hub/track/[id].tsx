import React from 'react';
import {NextPage} from "next";
import Image from "next/image";
import styles from "@/styles/TrackPage.module.css"
import Link from "next/link";
import {InfoCircleOutlined} from "@ant-design/icons";
import useTextLength from "@/util/useTextLength";
import {Button, ConfigProvider, Divider, Input, Popover} from "antd";

import {track} from "@/api/dto/tracks.entity";

const TrackPage: NextPage = () => {

    const [artistName, trackName] = track.name.split(' - ')
    const genres = track.genre.map(gen => [].concat(gen.name)).join(' | ')
    const descriptionLength = useTextLength(track.description, 270)

    return (
        <div className={styles.main}>
            <div className={styles.infoContainer}>
                <div className={styles.infoMain}>
                    <div className={styles.infoText}>
                        <h1 className={styles.trackOwnerText}><Link className={styles.link}
                                                                    href={`/pth/hub/profile/${track.artist}`}>{artistName}</Link>
                        </h1>
                        <h1 className={styles.trackNameText}>{trackName}</h1>
                        {track.album.name ? <p className={styles.trackInfo}>ALBUM: <Link
                            className={styles.link}
                            href={`/pth/hub/album/${track.album._id}`}>
                            {track.album.name}
                        </Link>
                        </p> : null}
                        {genres.length !== 0 ? <p className={styles.trackInfo}>GENRES: {genres}</p> : null}
                    </div>
                    <Image className={styles.image} priority={true} width={260} height={260} src={track.image}
                           alt={'track_logo'}/>
                </div>
                <div className={styles.description}>
                    {track.description.length > 270 ?
                        <>
                            <Popover overlayStyle={{width: 600}} content={track.description}>
                                <InfoCircleOutlined/>
                            </Popover>
                            <p>DESCRIPTION: {descriptionLength}</p>
                        </>
                        :
                        <p>DESCRIPTION: {descriptionLength}</p>
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
                            track.comments.map(com =>
                                <div className={styles.commentItem}>
                                    <Divider style={{color: "white", border: "#343434"}} orientation={"left"}>
                                        {com.user}
                                    </Divider>
                                    <p className={styles.comment}>{com.text}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

TrackPage.displayName = 'Track Page'
export default TrackPage;