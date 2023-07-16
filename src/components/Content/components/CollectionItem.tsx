import React from 'react';
import styles from "./styles/CollectionItem.module.css"
import Image from "next/image";
import useTextLength from "@/util/useTextLength";
import {useRouter} from "next/navigation";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

interface CollectionItem {
    item: playlistDto | albumDto
    type: string
}

const CollectionItem: React.FC<CollectionItem> = ({item, type}) => {

    const router = useRouter()

    const nameLength = useTextLength(item.name[1], 40)
    const descriptionLength = useTextLength(item.description, 40)

    return (
        <div className={styles.main} onClick={() => router.push(`/pth/hub/${type}/${item._id}`)}>
            <Image
                className={styles.image}
                priority={true} width={160}
                height={160}
                quality={50}
                src={`http://localhost:4221/${type}/${item.name[0]}/${item.image}`}
                alt={'collection_logo'}
            />
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{`${item.name[0]} - ${nameLength}`}</h1>
                <p className={styles.description}>{descriptionLength}</p>
            </div>
        </div>
    );
};

export default CollectionItem;