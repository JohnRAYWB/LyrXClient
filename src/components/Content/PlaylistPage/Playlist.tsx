import React from 'react';
import styles from "./styles/Playlist.module.css"
import Image from "next/image";
import useTextLength from "@/util/useTextLength";
import {previewItemDto} from "@/api/dto/previewItem.dto";

interface Playlist {
    playlist: previewItemDto
}

const Playlist: React.FC<Playlist> = ({playlist}) => {

    const textLength = useTextLength(playlist.description, 40)

    return (
        <div className={styles.main}>
            <Image className={styles.image} priority={true} width={160} height={160} quality={50} src={playlist.image} alt={'playlist_logo'}/>
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{playlist.name}</h1>
                <p className={styles.description}>{textLength}</p>
            </div>
        </div>
    );
};

export default Playlist;