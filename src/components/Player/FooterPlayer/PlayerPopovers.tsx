import React from 'react';
import {
    ArrowsAltOutlined,
    CloseOutlined,
    FilterOutlined,
    MenuUnfoldOutlined,
    ShrinkOutlined,
    SoundOutlined
} from "@ant-design/icons";
import {ConfigProvider, Popover} from "antd";

import styles from "../styles/PlayerPopovers.module.css";
import PlayerTracksList from "@/components/Player/FooterPlayer/PlayerTracksList";
import {trackDto} from "@/api/dto/track.dto";

interface Param {
    currentTrack: trackDto
    tracksList: trackDto[]
    isPlaying: boolean
    popup: boolean
    setPopup: Function
    volume: number
    setVolume: Function
    handleClosePlayer: Function
}

const PlayerPopovers: React.FC<Param> = ({
                                             currentTrack,
                                             tracksList,
                                             isPlaying,
                                             popup,
                                             setPopup,
                                             volume,
                                             setVolume,
                                             handleClosePlayer
                                         }) => {
    return (
        <div className={popup ? styles.popupPopoverContainer : styles.popoversContainer}>
            {popup ?
                <ShrinkOutlined className={styles.actionButton} onClick={() => setPopup(!popup)}/>
                :
                <ArrowsAltOutlined className={styles.actionButton} onClick={() => setPopup(!popup)}/>
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
                <Popover content={
                    <input
                        className={styles.volumeControl}
                        type={"range"}
                        step={'any'}
                        min={0}
                        max={1}
                        value={volume}
                        onChange={e => setVolume(e.target.value)}
                    />}>
                    {volume <= 0 && <FilterOutlined className={styles.actionButton} rotate={90} onClick={() => setVolume(1)}/>}
                    {volume > 0 && <SoundOutlined className={styles.actionButton} onClick={() => setVolume(0)}/>}
                </Popover>
                {popup ?
                    null
                    :
                    <Popover content={
                        tracksList ?
                            <PlayerTracksList
                                tracksList={tracksList}
                                currentTrack={currentTrack}
                                isPlaying={isPlaying}
                                popup={popup}
                            />
                            :
                            null
                    }>
                        <MenuUnfoldOutlined className={styles.actionButton}/>
                    </Popover>
                }
            </ConfigProvider>
            {!popup ?
                <CloseOutlined className={styles.closeButton} onClick={handleClosePlayer}/>
                :
                null
            }
        </div>
    );
};

export default PlayerPopovers;