import React, {useState} from 'react';
import Image from "next/image";
import {
    EllipsisOutlined,
    HeartFilled,
    HeartOutlined,
    PauseOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";
import {ConfigProvider, Divider, Dropdown} from "antd";
import {trackDto} from "@/api/dto/track.dto";
import styles from "./styles/Track.module.css"
import {items} from "./components/TrackItems"
import useTextLength from "@/util/useTextLength";
import {useRouter} from "next/navigation";

interface Track {
    track: trackDto
    index: number
}

const Track: React.FC<Track> = ({track, index}) => {

    const router = useRouter()

    const [fav, setFav] = useState(false)
    const [active, setActive] = useState(false)

    const addFavorite = () => {
        if (track.favorites !== 0) {
            track.favorites--
            return setFav(false)
        } else {
            track.favorites++
            return setFav(true)
        }
    }

    const artistLength = useTextLength(track.name[0], 20)
    const trackLength = useTextLength(track.name[1], 20)
    const albumLength = useTextLength(track.album || '', 20)

    let folder = 'track'
    if (track.protectedDeletion) {
        folder = 'album'
    }

    return (
        <div className={styles.main} onClick={() => router.push(`/pth/hub/track/${track._id}`)}>
            <div className={styles.container}>
                <div className={styles.imagePlayButtonContainer}>
                    <p>{index}</p>
                    {!active ?
                        <PlayCircleOutlined onClick={(e) => {
                            e.stopPropagation()
                            setActive(true)
                        }} className={styles.playButton}/>
                        :
                        <PauseOutlined onClick={(e) => {
                            e.stopPropagation()
                            setActive(false)
                        }} className={styles.playButton}/>
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
                <div className={styles.trackContainer}>
                    <p className={styles.trackName}>{trackLength}</p>
                    <p className={styles.trackArtist}>{artistLength}</p>
                </div>
                <p className={styles.album}>{albumLength}</p>
                <div className={styles.actionIcons}>
                    {
                        !fav ?
                            <HeartOutlined onClick={e => {
                                e.stopPropagation()
                                addFavorite()
                            }} className={styles.favIcon}/>
                            :
                            <HeartFilled onClick={e => {
                                e.stopPropagation()
                                addFavorite()
                            }} className={styles.favIconFill}/>
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
                            <EllipsisOutlined onClick={e => e.stopPropagation()} className={styles.dots}/>
                        </Dropdown>
                    </ConfigProvider>
                </div>
            </div>
            <Divider style={{width: 50}} className={styles.divider}/>
        </div>
    );
};

export default Track;