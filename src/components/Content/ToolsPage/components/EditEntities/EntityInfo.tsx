import React from 'react';
import Image from "next/image";

import styles from "../../styles/EditEntity.module.css";
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import {useRouter} from "next/navigation";
import useTextLength from "@/util/useTextLength";

interface Param {
    entity: trackDto | playlistDto | albumDto
    type: string
}

const EntityInfo: React.FC<Param> = ({entity, type}) => {

    const router = useRouter()

    let description

    type !== 'track' ? description = useTextLength(entity.description, 100) : null

    return (
        <>
            {type === 'track' ?
                <Image
                    className={styles.image}
                    width={125}
                    height={125}
                    priority={true}
                    src={`http://localhost:4221/track/${entity.name[0]}/${entity.image}`}
                    alt={'track_logo'}
                />
                :
                <Image
                    className={styles.image}
                    width={125}
                    height={125}
                    priority={true}
                    src={`http://localhost:4221/${type}/${entity.name[0]}/${entity.image}`}
                    alt={'collection_logo'}
                />
            }
            <div>
                <p className={styles.entityName}>{entity.name[1]}</p>
                <p
                    onClick={() => router.push(`/pth/hub/users/${"artist" in entity ? entity.artist : entity.user}`)}
                    className={styles.entityArtist}>{entity.name[0]}
                </p>
            </div>
            {type === 'track' && 'listens' in entity ?
                <>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Favorites</p>
                        <p className={styles.scoreCount}>{entity.favorites}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Listens</p>
                        <p className={styles.scoreCount}>{entity.listens}</p>
                    </div>
                </>
                :
                <>
                    <div className={styles.descriptionContainer}>
                        <p className={styles.description}>{description}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Favorites</p>
                        <p className={styles.scoreCount}>{entity.favorites}</p>
                    </div>
                </>
            }
        </>
    );
};

export default EntityInfo;