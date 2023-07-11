import React, {useState} from 'react';
import {NextPage} from "next";
import Image from "next/image";
import styles from "@/styles/TrackPage.module.css"
import Link from "next/link";
import {Button, ConfigProvider, Divider, Input, Popover} from "antd";
import {trackDto} from "@/api/dto/track.dto";
import axios from "axios";

const TrackPage: NextPage = ({serverTrack}) => {

    const [track, setTrack] = useState<trackDto>(serverTrack)
    let folder = 'track'
    track.protectedDeletion ? folder = 'album' : folder

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
                        {track.album ? <p className={styles.trackInfo}>ALBUM: <Link
                            className={styles.link}
                            href={`/pth/hub/album/${track.album._id}`}>
                            {track.album.name}
                        </Link>
                        </p> : null}
                        {track.genre.length !== 0 ? <p className={styles.trackInfo}>GENRES: {track.genre}</p> : null}
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
                    {track.description && track.description.length !== '' ?
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

export const getServerSideProps: ({params}) => Promise<{ props: { serverTrack: trackDto } }> = async ({params}) => {
    const response = await axios.get(`http://localhost:4221/tracks/${params.id}/current`)
    const track = response.data
    track.genre.map(gen => ({name: gen.name}))
    return {
        props: {
            serverTrack: response.data
        }
    }
}
