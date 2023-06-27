import React from 'react';
import styles from "@/styles/PlayerSideBar.module.css"
import Link from "next/link";
import {AppstoreOutlined, PlusOutlined} from "@ant-design/icons";
import {playlistsCollectionDto} from "@/api/dto/playlist.dto";

interface playlistLength {
    playlists: playlistsCollectionDto
}

const PlayerSideBar: React.FC<playlistLength> = ({playlists= 0}) => {
    console.log(playlists)

    if (playlists.length !== 0) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.elem}>
                        <AppstoreOutlined rotate={45}/>
                        <Link className={styles.elemLink} href={'/'}>Playlist collection</Link>
                    </div>
                    <Link className={styles.elemAdd} href={'/'}><PlusOutlined/></Link>
                </div>
            </main>
        )
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.elem}>
                    <AppstoreOutlined rotate={45}/>
                    <Link className={styles.elemLink} href={'/'}>Playlist collection</Link>
                </div>
                <Link className={styles.elemAdd} href={'/'}><PlusOutlined/></Link>
            </div>
            <div className={styles.firstPlaylist}>
                <p className={styles.firstPlaylistText}>Don't have playlist yet? Create it!</p>
                <p className={styles.firstPlaylistText}>It's easy than you can imagine.</p>
                <Link className={styles.firstPlaylistLink} href={'/'}>Create playlist</Link>
            </div>
        </main>
    );
};

export default PlayerSideBar;