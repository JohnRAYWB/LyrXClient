import React from 'react';

import styles from "../../../styles/EditEntity.module.css"
import {useDeleteAlbumMutation} from "@/store/api/AlbumApi";
import {LoadingOutlined} from "@ant-design/icons";
import EntityInfo from "@/components/Content/ToolsPage/components/EditEntities/EntityInfo";
import {albumDto} from "@/api/dto/album.dto";
import DeleteEntity from "@/components/Content/ToolsPage/components/EditEntities/DeleteEntity";

interface Param {
    album: albumDto
}

const DeleteAlbum: React.FC<Param> = ({album}) => {

    const [deleteAlbum, {isLoading}] = useDeleteAlbumMutation()

    return (
        <div className={styles.container}>
            {
                isLoading ?
                    <div className={styles.loadingDeleteContainer}>
                        <LoadingOutlined className={styles.loadingRed}/>
                    </div>
                    :
                    <div className={styles.entityInfoContainer}>
                        <EntityInfo entity={album} type={'album'}/>
                        <DeleteEntity entity={album} deleteAction={deleteAlbum}/>
                    </div>
            }
        </div>
    );
};

export default DeleteAlbum;