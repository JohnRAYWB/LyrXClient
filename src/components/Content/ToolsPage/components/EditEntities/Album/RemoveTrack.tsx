import React, {useState} from 'react';

import styles from "../../../styles/EditEntity.module.css"
import {albumDto} from "@/api/dto/album.dto";
import EntityInfo from "@/components/Content/ToolsPage/components/EditEntities/EntityInfo";
import TracksList from "@/components/Content/ToolsPage/components/EditEntities/TracksList";

interface Param {
    album: albumDto
}

const RemoveTrack: React.FC<Param> = ({album}) => {

    const [edit, setEdit] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.entityInfoContainer}>
                <EntityInfo entity={album} type={'album'}/>
                <p onClick={() => setEdit(!edit)} className={styles.editButton}>Edit</p>
            </div>
            {
                edit ?
                    <>
                        {
                            album.tracks.length !== 0 ?
                                <TracksList tracks={album.tracks}/>
                                :
                                <p className={styles.emptyTitle}>Here no tracks yet</p>
                        }
                    </>
                    :
                    null
            }
        </div>
    );
};

export default RemoveTrack;