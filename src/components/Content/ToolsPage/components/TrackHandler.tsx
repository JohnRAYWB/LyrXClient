import React from 'react';
import {useRouter} from "next/navigation";

import styles from "../styles/TrackHandler.module.css"
import {
    useFetchAllTrackAndSearchQuery,
    useFetchMostLikedTrackQuery,
    useFetchMostListensTrackQuery
} from "@/store/api/TrackApi";
import {useFetchAllUserAndSearchQuery} from "@/store/api/UserApi";
import Image from "next/image";
import TrackEntities from "@/components/Content/ToolsPage/components/TrackEntities";

interface Param {
    setTotalCount: Function
}

const TrackHandler: React.FC<Param> = ({setTotalCount}) => {

    const {data: tracks, isLoading: trackLoading} = useFetchAllTrackAndSearchQuery('')
    const {data: users, isLoading: userLoading} = useFetchAllUserAndSearchQuery('')
    const {data: favTracks, isLoading: favLoading} = useFetchMostLikedTrackQuery()
    const {data: lisTracks, isLoading: lisLoading} = useFetchMostListensTrackQuery()

    if (trackLoading || userLoading) {
        return <></>
    }

    setTotalCount(tracks.length)

    let listens = 0

    const uploadsForTheDay = tracks.filter(track => {
        listens += track.listens
        const date = new Date(track.createdTime).toLocaleDateString().split('.')
        const now = new Date(Date.now()).toLocaleDateString().split('.')
        if (now[0] === date[0] && now[1] === date[1] && now[2] === date[2]) {
            return track
        }
    }).length

    const router = useRouter()

    return (
        <div className={styles.detailedStatContainer}>
            <h1 className={styles.detailedStatTitle}>Tracks Statistic</h1>
            <div className={styles.detailedStatEntitiesContainer}>
                <div>
                    <h1 className={styles.detailedEntityTitle}>Main info</h1>
                    <div className={styles.detailedStatEntities}>
                        <div className={styles.detailedStatEntity}>
                            <p className={styles.entityTitle}>Total count</p>
                            <p className={styles.entityScore}>{tracks.length}</p>
                        </div>
                        <div className={styles.detailedStatEntity}>
                            <p className={styles.entityTitle}>Listens for all time</p>
                            <p className={styles.entityScore}>{listens}</p>
                        </div>
                        <div className={styles.detailedStatEntity}>
                            <p className={styles.entityTitle}>Added for the day</p>
                            <p className={styles.entityScore}>{uploadsForTheDay}</p>
                        </div>
                    </div>
                    <h1 className={styles.detailedEntityTitle}>Top list</h1>
                    <div className={styles.topTrackContainer}>
                        <div>
                            <h1 className={styles.detailedStatTitle}>Most favorites tracks</h1>
                            <TrackEntities tracks={favTracks} type={'fav'}/>
                        </div>
                        <div>
                            <h1 className={styles.detailedStatTitle}>Most listens tracks</h1>
                            <TrackEntities tracks={lisTracks} type={'lis'}/>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className={styles.detailedStatTitle}>Track Control Tools</h1>
            <div className={styles.adminToolContainer}>
                <p className={styles.adminToolButton}>Add new genre</p>
                <p onClick={() => router.push('/pth/hub/admin/track/artist')} className={styles.adminToolButton}>Edit track artist</p>
                <p className={styles.adminToolButton}>Delete track</p>
            </div>
        </div>
    );
};

export default TrackHandler;