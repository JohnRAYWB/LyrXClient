import React from 'react';
import styles from "../styles/PlaylistSider.module.css"
import Link from "next/link";
import {AppstoreOutlined, PlusOutlined} from "@ant-design/icons";

interface playlistLength {
    playlists: number
}

const PlaylistSider: React.FC<playlistLength> = ({playlists}) => {

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.elem}>
                    <AppstoreOutlined rotate={45}/>
                    <Link className={styles.elemLink} href={'/pth/hub/playlist/list'}>Playlist collection</Link>
                </div>
                {playlists !== 0 ?
                    <Link href={'/pth/hub/playlist/create'}><PlusOutlined className={styles.elemAdd}/></Link>
                    :
                    null
                }
            </div>
            {playlists === 0 ?
                <div className={styles.firstPlaylist}>
                    <p className={styles.firstPlaylistText}>Don't have playlist yet? Create it!</p>
                    <p className={styles.firstPlaylistText}>It's easy than you can imagine.</p>
                    <Link className={styles.firstPlaylistLink} href={'/pth/hub/playlist/create'}>Create playlist</Link>
                </div>
                :
                null
            }
        </main>
    );
};

export default PlaylistSider;