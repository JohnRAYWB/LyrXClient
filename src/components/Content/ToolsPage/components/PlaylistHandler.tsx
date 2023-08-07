import React from 'react';
import {useRouter} from "next/navigation";

import styles from "../styles/EntitiesHandler.module.css"
import CollectionStat from "@/components/Content/ToolsPage/components/CollectionStat";
import {useFetchAllPlaylistAndSearchQuery, useFetchMostLikedPlaylistQuery} from "@/store/api/PlaylistApi";


interface Param {
    setTotalCount: Function
}

const PlaylistHandler: React.FC<Param> = ({setTotalCount}) => {

    const {data: playlists, isLoading} = useFetchAllPlaylistAndSearchQuery('')
    const {data: favPlaylists, isLoading: favLoading} = useFetchMostLikedPlaylistQuery()

    if(isLoading || favLoading) {
        return <></>
    }

    setTotalCount(playlists.length)

    const router = useRouter()

    return (
        <div className={styles.detailedStatContainer}>
            <CollectionStat collection={playlists} favoritesCollection={favPlaylists} entitiesType={'playlist'} title={'Playlists'}/>
            <h1 className={styles.detailedStatTitle}>Track Control Tools</h1>
            <div className={styles.adminToolContainer}>
                <p onClick={() => router.push('/pth/hub/admin/playlist/delete')} className={styles.adminToolButton}>Delete playlist</p>
            </div>
        </div>
    );
};

export default PlaylistHandler;