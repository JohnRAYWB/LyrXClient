import React from 'react';
import Image from "next/image";

import styles from "../styles/TrackHandler.module.css";
import {trackDto} from "@/api/dto/track.dto";
import {useRouter} from "next/navigation";

interface Param {
    tracks: trackDto[]
    type: string
}

const TrackEntities: React.FC<Param> = ({tracks, type}) => {

    const router = useRouter()

    return (
        <div className={styles.trackListContainer}>
            {tracks.slice(0, 5).map(track =>
                <div onClick={() => router.push(`/pth/hub/track/${track._id}`)} className={styles.trackContainer}>
                    <Image
                        width={100}
                        height={100}
                        priority={true}
                        src={track.protectedDeletion ?
                            `http://localhost:4221/album/${track.name[0]}/${track.image}`
                            :
                            `http://localhost:4221/track/${track.name[0]}/${track.image}`
                        }
                        alt={'track_logo'}
                    />
                    <p>{track.name[1]}</p>
                    <div className={styles.trackScoreContainer}>
                        {
                            type === 'fav' ?
                                <>
                                    <p className={styles.trackScoreTitle}>Favorites</p>
                                    <p className={styles.trackScoreCount}>{track.favorites}</p>
                                </>
                            :
                            <>
                                <p className={styles.trackScoreTitle}>Listens</p>
                                <p className={styles.trackScoreCount}>{track.listens}</p>
                            </>
                        }

                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackEntities;