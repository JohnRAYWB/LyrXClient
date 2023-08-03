import React, {useState} from 'react';

import styles from "./styles/ToolsPage.module.css"
import UserHandler from "@/components/Content/ToolsPage/components/UserHandler";
import TrackHandler from "@/components/Content/ToolsPage/components/TrackHandler";
import PlaylistHandler from "@/components/Content/ToolsPage/components/PlaylistHandler";
import AlbumHandler from "@/components/Content/ToolsPage/components/AlbumHandler";

const AdminTools = () => {

    const [totalUsers, setTotalUsers] = useState(0)
    const [totalTracks, setTotalTracks] = useState(0)
    const [totalPlaylists, setTotalPlaylists] = useState(0)
    const [totalAlbums, setTotalAlbums] = useState(0)

    const [activeUser, setActiveUser] = useState(false)
    const [activeTrack, setActiveTrack] = useState(false)
    const [activePlaylist, setActivePlaylist] = useState(false)
    const [activeAlbum, setActiveAlbum] = useState(false)

    const [children, setChildren] = useState(<></>)

    const handleUserStats = () => {
        setActiveUser(true)
        setActiveTrack(false)
        setActivePlaylist(false)
        setActiveAlbum(false)
        return setChildren(<UserHandler setTotalCount={setTotalUsers}/>)
    }

    const handleTrackStats = () => {
        setActiveUser(false)
        setActiveTrack(true)
        setActivePlaylist(false)
        setActiveAlbum(false)
        return setChildren(<TrackHandler setTotalCount={setTotalTracks}/>)
    }

    const handlePlaylistStats = () => {
        setActiveUser(false)
        setActiveTrack(false)
        setActivePlaylist(true)
        setActiveAlbum(false)
        return setChildren(<PlaylistHandler setTotalCount={setTotalPlaylists}/>)
    }

    const handleAlbumStats = () => {
        setActiveUser(false)
        setActiveTrack(false)
        setActivePlaylist(false)
        setActiveAlbum(true)
        return setChildren(<AlbumHandler setTotalCount={setTotalAlbums}/>)
    }

    return (
        <div className={styles.container}>
            <div className={styles.statistic}>
                <h1>STATISTIC</h1>
                <div className={styles.statisticEntities}>
                    <div onClick={handleUserStats} className={styles.statisticEntity}>
                        {
                            activeUser ?
                                <>
                                    <h1 className={styles.statisticEntityTitle}>USERS</h1>
                                    <div className={styles.statisticScore}>
                                        <p>{totalUsers}</p>
                                        <p>TOTAL</p>
                                    </div>
                                </>
                                :
                                <h1 className={styles.statisticEntityTitle}>USERS</h1>
                        }
                    </div>
                    <div onClick={handleTrackStats} className={styles.statisticEntity}>
                        {
                            activeTrack ?
                                <>
                                    <h1 className={styles.statisticEntityTitle}>TRACKS</h1>
                                    <div className={styles.statisticScore}>
                                        <p>{totalTracks}</p>
                                        <p>TOTAL</p>
                                    </div>
                                </>
                                :
                                <h1 className={styles.statisticEntityTitle}>TRACKS</h1>
                        }

                    </div>
                    <div onClick={handlePlaylistStats} className={styles.statisticEntity}>
                        {
                            activePlaylist ?
                                <>
                                    <h1 className={styles.statisticEntityTitle}>PLAYLISTS</h1>
                                    <div className={styles.statisticScore}>
                                        <p>{totalPlaylists}</p>
                                        <p>TOTAL</p>
                                    </div>
                                </>
                                :
                                <h1 className={styles.statisticEntityTitle}>PLAYLISTS</h1>
                        }
                    </div>
                    <div onClick={handleAlbumStats} className={styles.statisticEntity}>
                        {
                            activeAlbum ?
                                <>
                                    <h1 className={styles.statisticEntityTitle}>ALBUMS</h1>
                                    <div className={styles.statisticScore}>
                                        <p>{totalAlbums}</p>
                                        <p>TOTAL</p>
                                    </div>
                                </>
                                :
                                <h1 className={styles.statisticEntityTitle}>ALBUMS</h1>
                        }
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default AdminTools;