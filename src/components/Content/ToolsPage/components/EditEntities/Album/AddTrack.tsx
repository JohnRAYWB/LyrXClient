import React, {useState} from 'react';

import styles from "../../../styles/EditEntity.module.css"
import {albumDto} from "@/api/dto/album.dto";
import EntityInfo from "@/components/Content/ToolsPage/components/EditEntities/EntityInfo";
import AlbumsTrackDirection from "@/components/Content/ToolsPage/components/EditEntities/AlbumsTrackDirection";
import {useFetchUserByIdQuery} from "@/store/api/UserApi";

interface Param {
    album: albumDto
}

const AddTrack: React.FC<Param> = ({album}) => {

    const [edit, setEdit] = useState(false)
    const {data: user, isLoading} = useFetchUserByIdQuery(album.artist)

    if (isLoading) {
        return <></>
    }

    const tracks = user.tracks.filter(track => !track.protectedDeletion)

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
                            tracks.length !== 0 ?
                            <AlbumsTrackDirection tracks={tracks} albumId={album._id} type={'add'}/>
                            :
                            <p className={styles.emptyTitle}>The artist has no singles</p>
                        }
                    </>
                    :
                    null
            }
        </div>
    );
};

export default AddTrack;