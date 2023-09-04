import React from 'react';
import Image from "next/image";

import styles from "../styles/PlayerTrackInfo.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";
import useTextLength from "@/util/useTextLength";

interface Param {
    track: trackDto
    index: number
    popup: boolean
}

const PlayerTrackInfo: React.FC<Param> = ({track, index, popup}) => {
    return (
        <div className={popup ? styles.trackInfoPopupContainer : styles.trackInfoFooterContainer}>
            {popup ?
                null
                :
                <p>{index + 1}</p>
            }
            <Image
                className={styles.image}
                width={popup ? 400 : 60}
                height={popup ? 400 : 60}
                priority={true}
                quality={100}
                src={track.protectedDeletion ? albumsTrackImagePath(track) : trackImagePath(track)}
                alt={'track_logo'}
            />
            <div className={popup ? styles.trackNamesPopupContainer : styles.trackNamesFooterContainer}>
                <p className={popup ? styles.trackPopupName : styles.trackFooterName}>{useTextLength(track.name[1], 11)}</p>
                <p className={popup ? styles.trackPopupArtist : styles.trackFooterArtist}>{useTextLength(track.name[0], 11)}</p>
            </div>
        </div>
    );
};

export default PlayerTrackInfo;