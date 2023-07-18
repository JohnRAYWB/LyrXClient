import React from 'react';
import styles from "../styles/PlaylistSider.module.css"
import Link from "next/link";
import {AppstoreOutlined, PlusOutlined} from "@ant-design/icons";
import {playlistDto} from "@/api/dto/playlist.dto";

interface playlistLength {
    playlists: number
}

const PlaylistSider: React.FC<playlistLength> = ({playlists}) => {

    if (playlists !== 0) {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.elem}>
                        <AppstoreOutlined rotate={45}/>
                        <Link className={styles.elemLink} href={'/'}>Playlist collection</Link>
                    </div>
                    <Link className={styles.elemAdd} href={'/'}><PlusOutlined/></Link>
                </div>
            </div>
        )
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.elem}>
                    <AppstoreOutlined rotate={45}/>
                    <Link className={styles.elemLink} href={'/pth/hub/track'}>Playlist collection</Link>
                </div>
                <Link href={'/'}><PlusOutlined className={styles.elemAdd}/></Link>
            </div>
            <div className={styles.firstPlaylist}>
                <p className={styles.firstPlaylistText}>Don't have playlist yet? Create it!</p>
                <p className={styles.firstPlaylistText}>It's easy than you can imagine.</p>
                <Link className={styles.firstPlaylistLink} href={'/'}>Create playlist</Link>
            </div>
        </main>
    );
};

export default PlaylistSider;