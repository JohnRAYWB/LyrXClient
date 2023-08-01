import React from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";

import styles from "../styles/EntitiesHandler.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

interface Param {
    entities: trackDto[] | playlistDto[] | albumDto[]
    entityType: string
    type: string
}

const EntitiesList: React.FC<Param> = ({entities, entityType, type}) => {

    const router = useRouter()

    return (
        <div className={styles.trackListContainer}>
            {entities.slice(0, 5).map(entity =>
                <div onClick={() => router.push(`/pth/hub/${entityType}/${entity._id}`)}
                     className={styles.trackContainer}>
                    {entity.protectedDeletion ?
                        <Image
                            width={100}
                            height={100}
                            priority={true}
                            src={`http://localhost:4221/album/${entity.name[0]}/${entity.image}`}
                            alt={'track_logo'}
                        />
                        :
                        <Image
                            width={100}
                            height={100}
                            priority={true}
                            src={`http://localhost:4221/${entityType}/${entity.name[0]}/${entity.image}`}
                            alt={'collection_logo'}
                        />
                    }
                    <p>{entity.name[1]}</p>
                    <div className={styles.trackScoreContainer}>
                        {
                            type === 'favorites' ?
                                <>
                                    <p className={styles.trackScoreTitle}>Favorites</p>
                                    <p className={styles.trackScoreCount}>{entity.favorites}</p>
                                </>
                                :
                                null
                        }
                        {
                            type === 'listens' ?
                                <>
                                    <p className={styles.trackScoreTitle}>Listens</p>
                                    <p className={styles.trackScoreCount}>{entity.listens}</p>
                                </>
                                :
                                null
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntitiesList;