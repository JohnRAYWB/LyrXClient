import React from 'react';
import Image from "next/image";

import styles from "../styles/PlayerTrackInfo.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";
import useTextLength from "@/util/useTextLength";

interface Param {
    track: trackDto
    isPlaying: boolean
    index: number
    popup: boolean
}

const PlayerTrackInfo: React.FC<Param> = ({track, isPlaying, index, popup}) => {
    return (
        <div className={popup ? styles.trackInfoPopupContainer : styles.trackInfoFooterContainer}>
            {popup ?
                null
                :
                <p>{index + 1}</p>
            }
            <Image
                className={popup ? styles.imagePopup : isPlaying ? styles.imagePlay : styles.imagePause}
                width={popup ? 400 : 60}
                height={popup ? 400 : 60}
                priority={true}
                src={track.protectedDeletion ? albumsTrackImagePath(track) : trackImagePath(track)}
                alt={'track_logo'}
            />
            <div className={popup ? styles.trackNamesPopupContainer : styles.trackNamesFooterContainer}>
                {popup ?
                    <>
                        <p className={styles.trackPopupName}>{useTextLength(track.name[1], 35)}</p>
                        <p className={styles.trackPopupArtist}>{useTextLength(track.name[0], 35)}</p>
                    </>
                :
                    <>
                        <p className={styles.trackFooterName}>{useTextLength(track.name[1], 20)}</p>
                        <p className={styles.trackFooterArtist}>{useTextLength(track.name[0], 20)}</p>
                    </>
                }
            </div>
        </div>
    );
};

export default PlayerTrackInfo;