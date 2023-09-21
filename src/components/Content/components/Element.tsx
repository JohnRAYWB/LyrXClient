import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

import styles from './styles/Element.module.css'
import useTextLength from "@/util/useTextLength";
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

interface element {
    item: trackDto | playlistDto | albumDto
    type: string
}

const Element: React.FC<element> = ({item, type}) => {

    const router = useRouter()
    const nameLength = useTextLength(item.name[1], 15)
    const descriptionLength = useTextLength(item.description || '', 40)
    let folder = type
    if(type === 'track' && 'protectedDeletion' in item && item.protectedDeletion) {
        folder = 'album'
    }

    return (
        <div className={styles.container} onClick={() => router.push(`/pth/hub/${type}/${item._id}`)}>
            <Image
                className={styles.image}
                priority={true}
                width={165}
                height={165}
                src={`http://localhost:4221/${folder}/${item.name[0]}/${item.image}`}
                alt={'logo'}
            />
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{`${item.name[0]} - ${nameLength}`}</h1>
                <p className={styles.description}>{descriptionLength}</p>
            </div>
        </div>
    );
};

export default Element;