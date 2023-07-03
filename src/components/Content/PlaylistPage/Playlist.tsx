import React from 'react';
import styles from "./styles/Playlist.module.css"
import {playlistDto} from "@/api/dto/playlist.dto";
import Image from "next/image";
import useTextLength from "@/util/useTextLength";

interface Playlist {
    playlist: playlistDto
}

const Playlist: React.FC<Playlist> = ({playlist}) => {

    const textLength = useTextLength(playlist.description, 40)

    return (
        <div className={styles.main}>
            <Image className={styles.image} priority={true} width={150} height={150} quality={50} src={playlist.image} alt={'playlist_logo'}/>
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{playlist.name}</h1>
                <p className={styles.description}>{textLength}</p>
            </div>
        </div>
    );
};

export default Playlist;