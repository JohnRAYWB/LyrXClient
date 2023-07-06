import React from 'react';
import styles from "./styles/CollectionItem.module.css"
import Image from "next/image";
import useTextLength from "@/util/useTextLength";
import {previewItemDto} from "@/api/dto/previewItem.dto";
import {useRouter} from "next/navigation";

interface CollectionItem {
    item: previewItemDto
    type: string
}

const Playlist: React.FC<CollectionItem> = ({item, type}) => {

    const router = useRouter()

    const nameLength = useTextLength(item.name, 40)
    const descriptionLength = useTextLength(item.description, 40)
    console.log(type)
    return (
        <div className={styles.main} onClick={() => router.push(`/pth/hub/${type}/${item._id}`)}>
            <Image className={styles.image} priority={true} width={160} height={160} quality={50} src={item.image} alt={'playlist_logo'}/>
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{nameLength}</h1>
                <p className={styles.description}>{descriptionLength}</p>
            </div>
        </div>
    );
};

export default Playlist;