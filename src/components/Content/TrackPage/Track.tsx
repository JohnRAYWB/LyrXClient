import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {
    EllipsisOutlined,
    HeartFilled,
    HeartOutlined,
    PauseOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {ConfigProvider, Divider, Dropdown, MenuProps} from "antd";
import Link from "next/link";

import styles from "./styles/Track.module.css"
import {trackDto} from "@/api/dto/track.dto";
import useTextLength from "@/util/useTextLength";
import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";

interface Track {
    track: trackDto
    index: number
}

const Track: React.FC<Track> = ({track, index}) => {

    const router = useRouter()

    const user = useAppSelector(selectUserData)

    const [fav, setFav] = useState(false)
    const [active, setActive] = useState(false)

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

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.mediaContainer}>
                    <p>{index}</p>
                    {!active ?
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
                    {
                        !fav ?
                            <HeartOutlined className={styles.favIcon}/>
                            :
                            <HeartFilled className={styles.favIconFill}/>
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