import React, {useState} from 'react';
import {trackDto} from "@/api/dto/track.dto";
import {albumDto} from "@/api/dto/album.dto";
import styles from "@/components/Content/ArtistTools/styles/EditArtistEntitiesTool.module.css";
import Image from "next/image";
import {albumImagePath, albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";
import useTextLength from "@/util/useTextLength";
import {ControlOutlined, DeleteOutlined, LoadingOutlined} from "@ant-design/icons";
import ConfirmHandler from "@/components/Content/components/ConfirmHandler";
import {useDeleteTrackMutation} from "@/store/api/TrackApi";
import {useDeleteAlbumMutation} from "@/store/api/AlbumApi";
import {useRouter} from "next/navigation";

interface Param {
    type: string
    action: string
    index: number
    entity: trackDto | albumDto
}

const EditArtistEntityTool: React.FC<Param> = ({type, action, index, entity}) => {

    const [confirm, setConfirm] = useState(false)

    const [deleteTrack, {isLoading: trackDeleteLoading}] = useDeleteTrackMutation()
    const [deleteAlbum, {isLoading: albumDeleteLoading}] = useDeleteAlbumMutation()

    const handleDeleteTrack = (tId) => {
        deleteTrack(tId)
    }

    const handleDeleteAlbum = (aId) => {
        deleteAlbum(aId)
    }

    const router = useRouter()

    return (
        <div className={styles.trackContainer}>
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
                {action === 'edit' ?
                    <>
                        {type === 'track' ?
                            <ControlOutlined
                                onClick={() => router.push(`/pth/hub/artist/edit_track/${entity._id}`)}
                                className={styles.editButton}
                            />
                            :
                            <ControlOutlined
                                onClick={() => router.push(`/pth/hub/artist/edit_album/${entity._id}`)}
                                className={styles.editButton}
                            />
                        }
                    </>
                    :
                    null
                }
                {action === 'delete' ?
                    <>
                        {type === 'track' ?
                            trackDeleteLoading ?
                                <LoadingOutlined className={styles.loadingSpinner}/>
                                :
                                <ConfirmHandler confirm={confirm} setConfirm={setConfirm}
                                                handleUpload={() => handleDeleteTrack(entity._id)}/>
                            :
                            albumDeleteLoading ?
                                <LoadingOutlined className={styles.loadingSpinner}/>
                                :
                                <ConfirmHandler confirm={confirm} setConfirm={setConfirm}
                                                handleUpload={() => handleDeleteAlbum(entity._id)}/>
                        }
                    </>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default EditArtistEntityTool;