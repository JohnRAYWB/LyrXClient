import React from 'react';

import styles from "../../styles/EditEntitiesList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import EditTrack from "@/components/Content/ToolsPage/components/EditEntities/Track/EditTrack";
import DeleteTrack from "@/components/Content/ToolsPage/components/EditEntities/Track/DeleteTrack";
import DeletePlaylist from "@/components/Content/ToolsPage/components/EditEntities/Playlist/DeletePlaylist";
import DeleteAlbum from "@/components/Content/ToolsPage/components/EditEntities/Album/DeleteAlbum";
import RemoveTrack from "@/components/Content/ToolsPage/components/EditEntities/Album/RemoveTrack";
import AddTrack from "@/components/Content/ToolsPage/components/EditEntities/Album/AddTrack";

interface Param {
    entities: trackDto[] | playlistDto[] | albumDto[]
    entitiesType: string
    type: string
    refetch: Function
}

const EditEntitiesList: React.FC<Param> = ({entities, entitiesType, type, refetch}) => {

    const handleRefetch = () => {
        refetch()
    }

    if (entitiesType === 'track' && type === 'edit') {
        return (
            <div>
                <button onClick={handleRefetch} className={styles.refetchButton}>Refetch</button>
                {entities.map(entity =>
                    !entity.protectedDeletion ?
                        <EditTrack key={entity._id} track={entity}/>
                        :
                        null
                )}
            </div>
        )
    }

    if (entitiesType === 'track' && type === 'delete') {
        return (
            <div>
                <button onClick={handleRefetch} className={styles.refetchButton}>Refetch</button>
                {entities.map(entity =>
                    !entity.protectedDeletion ?
                        <DeleteTrack key={entity._id} track={entity}/>
                        :
                        null
                )}
            </div>
        )
    }

    if (entitiesType === 'playlist' && type === 'delete') {
        return (
            <div>
                <button onClick={handleRefetch} className={styles.refetchButton}>Refetch</button>
                {entities.map(entity =>
                    <DeletePlaylist playlist={entity}/>
                )}
            </div>
        )
    }

    if (entitiesType === 'album' && type === 'delete') {
        return (
            <div>
                <button onClick={handleRefetch} className={styles.refetchButton}>Refetch</button>
                {entities.map(entity =>
                    <DeleteAlbum album={entity}/>
                )}
            </div>
        )
    }

    if(entitiesType === 'album' && type === 'add') {
        return (
            <div>
                <button onClick={handleRefetch} className={styles.refetchButton}>Refetch</button>
                {entities.map(entity =>
                    <AddTrack album={entity}/>
                )}
            </div>
        )
    }

    if(entitiesType === 'album' && type === 'remove') {
        return (
            <div>
                <button onClick={handleRefetch} className={styles.refetchButton}>Refetch</button>
                {entities.map(entity =>
                    <RemoveTrack album={entity}/>
                )}
            </div>
        )
    }
};

export default EditEntitiesList;