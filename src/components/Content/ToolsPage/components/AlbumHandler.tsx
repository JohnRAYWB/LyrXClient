import React from 'react';
import {useRouter} from "next/navigation";

import styles from "../styles/EntitiesHandler.module.css"
import CollectionStat from "@/components/Content/ToolsPage/components/CollectionStat";
import {useFetchAllAlbumAndSearchQuery, useFetchMostLikedAlbumQuery} from "@/store/api/AlbumApi";

interface Param {
    setTotalCount: Function
}

const AlbumHandler: React.FC<Param> = ({setTotalCount}) => {

    const {data: albums, isLoading} = useFetchAllAlbumAndSearchQuery('')
    const {data: favAlbums, isLoading: favLoading} = useFetchMostLikedAlbumQuery()

    if (isLoading || favLoading) {
        return <></>
    }

    setTotalCount(albums.length)

    const router = useRouter()

    return (
        <div className={styles.detailedStatContainer}>
            <CollectionStat collection={albums} favoritesCollection={favAlbums} entitiesType={'album'} title={'Albums'}/>
            <h1 className={styles.detailedStatTitle}>Album Control Tools</h1>
            <div className={styles.adminToolContainer}>
                <p onClick={() => router.push('/pth/hub/admin/album/add_track')} className={styles.adminToolButton}>Add track to album</p>
                <p onClick={() => router.push('/pth/hub/admin/album/delete')} className={styles.adminToolButton}>Delete album</p>
                <p onClick={() => router.push('/pth/hub/admin/album/remove_track')} className={styles.adminToolButton}>Remove track to album</p>
            </div>
        </div>
    );
};

export default AlbumHandler;