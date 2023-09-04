import React from 'react';
import {
    BackwardOutlined,
    CaretRightOutlined,
    ForwardOutlined,
    PauseOutlined,
    RetweetOutlined,
    SwapOutlined
} from "@ant-design/icons";

import styles from "../styles/ControlsContainer.module.css"

interface Param {
    popup: boolean
    isPlaying: boolean
    repeat: boolean
    setRepeat: Function
    shuffle: boolean
    setShuffle: Function
    handlePlayPause: Function
    handleNextTrack: Function
    handlePrevTrack: Function
}

const PlayerControls: React.FC<Param> = ({
                                             popup,
                                             isPlaying,
                                             repeat,
                                             setRepeat,
                                             shuffle,
                                             setShuffle,
                                             handlePlayPause,
                                             handleNextTrack,
                                             handlePrevTrack
                                         }) => {
    return (
        <div className={popup ? styles.controlsPopupContainer : styles.controlsFooterContainer}>
            {popup ?
                <RetweetOutlined
                    className={repeat ? styles.popupCornerButtonOn : styles.popupCornerButtonOff}
                    onClick={() => setRepeat(prev => !prev)}
                />
                :
                <RetweetOutlined
                    className={repeat ? styles.footerCornerButtonOn : styles.footerCornerButtonOff}
                    onClick={() => setRepeat(prev => !prev)}
                />
            }
            <div className={popup ? styles.playingControlsPopupContainer : styles.playingControlsFooterContainer}>
                <BackwardOutlined className={popup ? styles.controlsButton : null} onClick={handlePrevTrack}/>
                {isPlaying ?
                    <PauseOutlined className={popup ? styles.controlsButton : null} onClick={handlePlayPause}/>
                    :
                    <CaretRightOutlined className={popup ? styles.controlsButton : null} onClick={handlePlayPause}/>
                }
                <ForwardOutlined className={popup ? styles.controlsButton : null} onClick={handleNextTrack}/>
            </div>
            {popup ?
                <SwapOutlined
                    className={shuffle ? styles.popupCornerButtonOn : styles.popupCornerButtonOff}
                    onClick={() => setShuffle(prev => !prev)}
                />
                :
                <SwapOutlined
                    className={shuffle ? styles.footerCornerButtonOn : styles.footerCornerButtonOff}
                    onClick={() => setShuffle(prev => !prev)}
                />
            }
        </div>
    );
};

export default PlayerControls;