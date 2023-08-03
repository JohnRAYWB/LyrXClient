import React from 'react';
import Image from "next/image";

import styles from "../styles/ArtistOwnElementInfo.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {albumDto} from "@/api/dto/album.dto";
import useTextLength from "@/util/useTextLength";
import {useScoreLength} from "@/util/useScoreLength";

interface Param {
    element: trackDto | albumDto
    elementType: string
    type?: string
}

const ArtistOwnElementInfo: React.FC<Param> = ({element, elementType, type}) => {

    const nameLength = useTextLength(element.name[1], 15)
    const artistNameLength = useTextLength(element.name[0], 15)

    let listensScore
    let commentedScore

    if('listens' in element && 'commentCount' in element && elementType === 'track') {
        listensScore = useScoreLength(element.listens)
        commentedScore = useScoreLength(element.commentCount)
    }

    const likedScore = useScoreLength(element.favorites)

    return (
        <div className={styles.container}>
            {elementType === 'track' ?
                <Image
                    width={85}
                    height={85}
                    priority={true}
                    src={
                        "protectedDeletion" in element && element.protectedDeletion ?
                            `http:localhost:4221/album/${element.name[0]}/${element.image}`
                            :
                            `http:localhost:4221/track/${element.name[0]}/${element.image}`
                    }
                    alt={'track_logo'}
                />
                :
                <Image
                    width={85}
                    height={85}
                    priority={true}
                    src={`http:localhost:4221/album/${element.name[0]}/${element.image}`}
                    alt={'track_logo'}
                />
            }
            <div className={styles.entityInfoContainer}>
                <p className={styles.entityName}>{nameLength}</p>
                <p>{artistNameLength}</p>
                {elementType === 'track' ?
                    <div className={styles.entityScoreContainer}>
                        {type === 'listens' ?
                            <>
                                <p className={styles.entityScoreTitle}>Listens</p>
                                <p className={styles.entityScoreCount}>{"listens" in element ? listensScore : null}</p>
                            </>
                            :
                            null
                        }
                        {type === 'favorites' ?
                            <>
                                <p className={styles.entityScoreTitle}>Favorites</p>
                                <p className={styles.entityScoreCount}>{likedScore}</p>
                            </>
                            :
                            null
                        }
                        {type === 'comment' ?
                            <>
                                <p className={styles.entityScoreTitle}>Comments</p>
                                <p className={styles.entityScoreCount}>{commentedScore}</p>
                            </>
                            :
                            null
                        }
                    </div>
                    :
                    null
                }
                {elementType === 'album' ?
                    <div className={styles.entityScoreContainer}>
                        <p className={styles.entityScoreTitle}>Favorites</p>
                        <p className={styles.entityScoreCount}>{likedScore}</p>
                    </div>
                    :
                    null
                }
            </div>

        </div>
    );
};

export default ArtistOwnElementInfo;