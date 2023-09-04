import React, {useState} from 'react';
import {notification} from "antd";

import styles from "../../styles/DeleteEntity.module.css";
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import ConfirmHandler from "@/components/Content/components/ConfirmHandler";

interface Param {
    entity: trackDto | playlistDto | albumDto
    deleteAction: Function
}

const DeleteEntity: React.FC<Param> = ({entity, deleteAction}) => {

    const [confirm, setConfirm] = useState(false)

    const handleDelete = () => {
        deleteAction(entity._id)

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Track deleted successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    return (
        <ConfirmHandler confirm={confirm} setConfirm={setConfirm} handleUpload={handleDelete} type={'delete'}/>
        /*<>
            {confirm ?
                <div className={styles.confirmContainer}>
                    <p className={styles.confirmTitle}>Are you sure?</p>
                    <div className={styles.confirmChoiceContainer}>
                        <p onClick={handleDelete} className={styles.confirmChoiceButton}>Yes</p>
                        <p onClick={() => setConfirm(false)} className={styles.confirmChoiceButton}>No</p>
                    </div>
                </div>
                :
                <p onClick={() => setConfirm(true)} className={styles.deleteButton}>Delete</p>
            }
        </>*/
    );
};

export default DeleteEntity;