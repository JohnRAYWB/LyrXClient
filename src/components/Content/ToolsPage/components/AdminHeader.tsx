import React, {useState} from 'react';

import styles from "../styles/ToolsPage.module.css";
import UserHandler from "@/components/Content/ToolsPage/components/UserHandler";

const AdminHeader: React.FC = () => {

    const [totalUsers, setTotalUsers] = useState(0)
    const [totalTracks, setTotalTracks] = useState(0)
    const [totalPlaylists, setTotalPlaylists] = useState(0)
    const [totalAlbums, setTotalAlbums] = useState(0)

    const [children, setChildren] = useState(<UserHandler setTotalCount={setTotalUsers}/>)

    const handleUserStats = () => {
        return setChildren(<UserHandler setTotalCount={setTotalUsers}/>)
    }

    const handleTrackStats = () => {
        const content = (
            <div>
                bla tr stats
            </div>
        )

        return setChildren(content)
    }

    const handlePlaylistStats = () => {
        const content = (
            <div>
                bla pl stats
            </div>
        )

        return setChildren(content)
    }

    const handleAlbumStats = () => {
        const content = (
            <div>
                bla al stats
            </div>
        )

        return setChildren(content)
    }

    return (
        <div>
            <div className={styles.statistic}>
                <h1>STATISTIC</h1>
                <div className={styles.statisticEntities}>
                    <div onClick={handleUserStats} className={styles.statisticEntity}>
                        <h1 className={styles.statisticEntityTitle}>USERS</h1>
                        <div className={styles.statisticScore}>
                            <p>{totalUsers}</p>
                            <p>TOTAL</p>
                        </div>
                    </div>
                    <div onClick={handleTrackStats} className={styles.statisticEntity}>
                        <h1 className={styles.statisticEntityTitle}>TRACKS</h1>
                        <div className={styles.statisticScore}>
                            <p>0</p>
                            <p>TOTAL</p>
                        </div>
                    </div>
                    <div onClick={handlePlaylistStats} className={styles.statisticEntity}>
                        <h1 className={styles.statisticEntityTitle}>PLAYLISTS</h1>
                        <div className={styles.statisticScore}>
                            <p>0</p>
                            <p>TOTAL</p>
                        </div>
                    </div>
                    <div onClick={handleAlbumStats} className={styles.statisticEntity}>
                        <h1 className={styles.statisticEntityTitle}>ALBUMS</h1>
                        <div className={styles.statisticScore}>
                            <p>0</p>
                            <p>TOTAL</p>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default AdminHeader;