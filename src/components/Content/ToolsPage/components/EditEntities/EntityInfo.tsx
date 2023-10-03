import React from 'react';
import Image from "next/image";

import styles from "../../styles/EditEntity.module.css";
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import {useRouter} from "next/navigation";
import useTextLength from "@/util/useTextLength";
import {useScoreLength} from "@/util/useScoreLength";
import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";

interface Param {
    entity: trackDto | playlistDto | albumDto
    type: string
}

const EntityInfo: React.FC<Param> = ({entity, type}) => {

    const router = useRouter()
    const user = useAppSelector(selectUserData)
    console.log(user)
    return (
        <>
            {type === 'track' ?
                <Image
                    className={styles.image}
                    width={50}
                    height={50}
                    priority={true}
                    src={`http://localhost:4221/track/${entity.name[0]}/${entity.image}`}
                    alt={'track_logo'}
                />
                :
                <Image
                    className={styles.image}
                    width={50}
                    height={50}
                    priority={true}
                    src={`http://localhost:4221/${type}/${entity.name[0]}/${entity.image}`}
                    alt={'collection_logo'}
                />
            }
            <div>
                <p className={styles.entityName}>{useTextLength(entity.name[1], 10)}</p>
                <p
                    onClick={() =>
                        "artist" in entity ?
                            entity.artist === user._id ?
                                router.push('/pth/hub/profile')
                                :
                                router.push(`/pth/hub/users/${entity.artist}`)
                            :
                            entity.user === user._id ?
                                router.push('/pth/hub/profile')
                                :
                                router.push(`/pth/hub/users/${entity.user}`)
                    }
                    className={styles.entityArtist}>{entity.name[0]}
                </p>
            </div>
            {type === 'track' && 'listens' in entity ?
                <>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Favorites</p>
                        <p className={styles.scoreCount}>{useScoreLength(entity.favorites)}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Listens</p>
                        <p className={styles.scoreCount}>{useScoreLength(entity.listens)}</p>
                    </div>
                </>
                :
                <>
                    <div className={styles.descriptionContainer}>
                        <p className={styles.description}>{useTextLength(entity.description, 25)}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Favorites</p>
                        <p className={styles.scoreCount}>{useScoreLength(entity.favorites)}</p>
                    </div>
                </>
            }
        </>
    );
};

export default EntityInfo;