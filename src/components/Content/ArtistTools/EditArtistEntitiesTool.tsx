import React from 'react';
import Image from "next/image";

import styles from "./styles/EditArtistEntitiesTool.module.css"
import {albumImagePath, albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";
import {trackDto} from "@/api/dto/track.dto";
import useTextLength from "@/util/useTextLength";
import {ControlOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {albumDto} from "@/api/dto/album.dto";

interface Param {
    type: string
    entities: trackDto[] | albumDto[]
}

const EditArtistEntitiesTool: React.FC<Param> = ({type, entities}) => {

    const router = useRouter()

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
                    <div key={entity._id} className={styles.trackContainer}>
                        <p className={styles.trackIndex}>{index + 1}</p>
                        <div>
                            {type === 'track' ?
                                <Image
                                    className={styles.image}
                                    width={50}
                                    height={50}
                                    priority={true}
                                    quality={50}
                                    src={
                                        entity.protectedDeletion ?
                                            albumsTrackImagePath(entity)
                                            :
                                            trackImagePath(entity)
                                    }
                                    alt={'track_logo'}
                                />
                                :
                                <Image
                                    className={styles.image}
                                    width={50}
                                    height={50}
                                    priority={true}
                                    quality={50}
                                    src={albumImagePath(entity)}
                                    alt={'album_logo'}
                                />
                            }
                        </div>
                        <div>
                            <p>{useTextLength(entity.name[1], 10)}</p>
                        </div>
                        {type !== 'album' ?
                            <div>
                                {entity.album ?
                                    <p>{useTextLength(entity.album.name[1], 10)}</p>
                                    :
                                    null
                                }
                            </div>
                            :
                            <p>{entity.description ? useTextLength(entity.description, 10) : ''}</p>
                        }
                        <div>
                            <p>{new Date(entity.createdTime).toLocaleDateString()}</p>
                        </div>
                        <div className={styles.editButtonContainer}>
                            {type === 'track' ?
                                <ControlOutlined onClick={() => router.push(`/pth/hub/artist/edit_track/${entity._id}`)}
                                                 className={styles.editButton}
                                />
                                :
                                <ControlOutlined onClick={() => router.push(`/pth/hub/artist/edit_album/${entity._id}`)}
                                                 className={styles.editButton}
                                />
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditArtistEntitiesTool;