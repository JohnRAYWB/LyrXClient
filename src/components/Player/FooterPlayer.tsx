import React from 'react';
import Image from "next/image";

import styles from "./styles/FooterPlayer.module.css"
import {albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {selectTrackData, setPlayerTrack} from "@/store/slice/player";
import {trackAudioPath} from "@/util/AudioPath";
import PlayerLine from "@/components/Player/PlayerLine";
import {CloseOutlined} from "@ant-design/icons";

const FooterPlayer = () => {

    const player = useAppSelector(selectTrackData)
    const dispatch = useAppDispatch()

    return (
        <>
            {player.activeTrack ?
                <div className={styles.container}>
                    <Image
                        className={styles.image}
                        width={50}
                        height={50}
                        priority={true}
                        src={player.activeTrack.protectedDeletion ? albumsTrackImagePath(player.activeTrack) : trackImagePath(player.activeTrack)}
                        alt={'track_logo'}
                    />
                    <PlayerLine url={trackAudioPath(player.activeTrack)} isPlaying={player.isPlaying}/>
                    <CloseOutlined className={styles.closeButton} onClick={() => dispatch(setPlayerTrack({tracksList: [], activeTrack: null, isPlaying: false}))}/>
                </div>
                :
                null
            }
        </>
    );
};

export default FooterPlayer;