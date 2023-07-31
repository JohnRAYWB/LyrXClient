import React from 'react';
import {useRouter} from "next/navigation";

import styles from "../styles/EntitiesHandler.module.css"
import CollectionStat from "@/components/Content/ToolsPage/components/CollectionStat";
import {
    useFetchAllTrackAndSearchQuery,
    useFetchMostLikedTrackQuery,
    useFetchMostListensTrackQuery
} from "@/store/api/TrackApi";

interface Param {
    setTotalCount: Function
}

const TrackHandler: React.FC<Param> = ({setTotalCount}) => {

    const {data: tracks, isLoading: trackLoading} = useFetchAllTrackAndSearchQuery('')
    const {data: favTracks, isLoading: favLoading} = useFetchMostLikedTrackQuery()
    const {data: lisTracks, isLoading: lisLoading} = useFetchMostListensTrackQuery()

    if (trackLoading || favLoading || lisLoading) {
        return <></>
    }

    setTotalCount(tracks.length)

    const router = useRouter()

    return (
        <div className={styles.detailedStatContainer}>
            <CollectionStat
                collection={tracks}
                favoritesCollection={favTracks}
                listensCollection={lisTracks}
                entitiesType={'track'}
                title={'Tracks'}
            />
            <h1 className={styles.detailedStatTitle}>Track Control Tools</h1>
            <div className={styles.adminToolContainer}>
                <p onClick={() => router.push('/pth/hub/admin/track/genre')} className={styles.adminToolButton}>Add new genre</p>
                <p onClick={() => router.push('/pth/hub/admin/track/artist')} className={styles.adminToolButton}>Edit track artist</p>
                <p onClick={() => router.push('/pth/hub/admin/track/delete')} className={styles.adminToolButton}>Delete track</p>
            </div>
        </div>
    );
};

export default TrackHandler;