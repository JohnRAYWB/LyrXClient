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

interface Track {
    track: trackDto
    index: number
}

const Track: React.FC<Track> = ({track, index}) => {

    const [fav, setFav] = useState(false)
    const [active, setActive] = useState(false)

    const addFavorite = () => {
        if (track.favorites !== 0) {
            track.favorites--
            console.log(track.favorites)
            return setFav(false)
        } else {
            track.favorites++
            console.log(track.favorites)
            return setFav(true)
        }
    }

    const textLength = useTextLength(track.album || '', 20)

    const [artist, trackName] = track.name.split(' - ')

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.imagePlayButtonContainer}>
                    <p>{index}</p>
                    {!active ?
                        <PlayCircleOutlined onClick={() => setActive(true)} className={styles.playButton}/>
                        :
                        <PauseOutlined onClick={() => setActive(false)} className={styles.playButton}/>
                    }
                    <Image className={styles.image} priority={true} width={45} height={45} src={track.image}
                           alt={'track_log0'}/>
                </div>
                <div className={styles.trackContainer}>
                    <p className={styles.trackName}>{trackName}</p>
                    <p className={styles.trackArtist}>{artist}</p>
                </div>
                <p className={styles.album}>{textLength}</p>
                <div className={styles.actionIcons}>
                    {
                        !fav ?
                            <HeartOutlined onClick={addFavorite} className={styles.favIcon}/>
                            :
                            <HeartFilled onClick={addFavorite} className={styles.favIconFill}/>
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