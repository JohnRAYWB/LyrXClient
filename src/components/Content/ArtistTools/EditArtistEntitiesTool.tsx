import React from 'react';

import styles from "./styles/EditArtistEntitiesTool.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {albumDto} from "@/api/dto/album.dto";
import EditArtistEntityTool from "@/components/Content/ArtistTools/components/EditArtistEntityTool";

interface Param {
    type: string
    action: string
    entities: trackDto[] | albumDto[]
}

const EditArtistEntitiesTool: React.FC<Param> = ({type, action, entities}) => {

    if (entities.length === 0) {
        return (
            <div className={styles.emptyListContainer}>
                <p className={styles.emptyList}>{type} not found</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your tracks</h1>
            <div className={styles.tracksContainer}>
                {entities.map((entity, index) =>
                    <EditArtistEntityTool
                        key={entity._id}
                        type={type}
                        action={action}
                        index={index}
                        entity={entity}
                    />
                )}
            </div>
        </div>
    );
};

export default EditArtistEntitiesTool;