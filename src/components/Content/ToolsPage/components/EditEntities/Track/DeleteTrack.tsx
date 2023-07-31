import React from 'react';

import styles from "../../../styles/EditEntity.module.css"
import EntityInfo from "@/components/Content/ToolsPage/components/EditEntities/EntityInfo";
import {trackDto} from "@/api/dto/track.dto";
import DeleteEntity from "@/components/Content/ToolsPage/components/EditEntities/DeleteEntity";
import {useDeleteTrackMutation} from "@/store/api/TrackApi";
import {LoadingOutlined} from "@ant-design/icons";

interface Param {
    track: trackDto
}

const DeleteTrack: React.FC<Param> = ({track}) => {

    const [deleteTrack, {isLoading}] = useDeleteTrackMutation()

    return (
        <div className={styles.container}>
            {
                isLoading ?
                    <div className={styles.loadingDeleteContainer}>
                        <LoadingOutlined className={styles.loadingRed}/>
                    </div>
                    :
                    <div className={styles.entityInfoContainer}>
                        <EntityInfo entity={track} type={'track'}/>
                        <DeleteEntity entity={track} deleteAction={deleteTrack}/>
                    </div>
            }
        </div>
    );
};

export default DeleteTrack;