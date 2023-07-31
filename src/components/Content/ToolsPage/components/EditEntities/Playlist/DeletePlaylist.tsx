import React from 'react';

import styles from "../../../styles/EditEntity.module.css"
import {useDeletePlaylistMutation} from "@/store/api/PlaylistApi";
import {LoadingOutlined} from "@ant-design/icons";
import EntityInfo from "@/components/Content/ToolsPage/components/EditEntities/EntityInfo";
import {playlistDto} from "@/api/dto/playlist.dto";
import DeleteEntity from "@/components/Content/ToolsPage/components/EditEntities/DeleteEntity";

interface Param {
    playlist: playlistDto
}

const DeletePlaylist: React.FC<Param> = ({playlist}) => {

    const [deletePlaylist, {isLoading}] = useDeletePlaylistMutation()

    return (
        <div className={styles.container}>
            {
                isLoading ?
                    <div className={styles.loadingDeleteContainer}>
                        <LoadingOutlined className={styles.loadingRed}/>
                    </div>
                    :
                    <div className={styles.entityInfoContainer}>
                        <EntityInfo entity={playlist} type={'playlist'}/>
                        <DeleteEntity entity={playlist} deleteAction={deletePlaylist}/>
                    </div>
            }
        </div>
    );
};

export default DeletePlaylist;