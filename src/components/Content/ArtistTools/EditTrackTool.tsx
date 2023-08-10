import React from 'react';
import Image from "next/image";

import styles from "./styles/EditTrackTool.module.css"
import {albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";
import {trackDto} from "@/api/dto/track.dto";
import useTextLength from "@/util/useTextLength";
import {ControlOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

interface Param {
    tracks: trackDto[]
}

const EditTrackTool: React.FC<Param> = ({tracks}) => {

    const router = useRouter()

    if(tracks.length === 0) {
        return (
            <div className={styles.emptyListContainer}>
                <p className={styles.emptyList}>Track not found</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your tracks</h1>
            <div className={styles.tracksContainer}>
                {tracks.map((track, index) =>
                    <div key={track._id} className={styles.trackContainer}>
                        <p className={styles.trackIndex}>{index + 1}</p>
                        <div>
                            <Image
                                className={styles.image}
                                width={50}
                                height={50}
                                priority={true}
                                quality={50}
                                src={
                                    track.protectedDeletion ?
                                        albumsTrackImagePath(track)
                                        :
                                        trackImagePath(track)
                                }
                                alt={'track_logo'}
                            />
                        </div>
                        <div>
                            <p>{useTextLength(track.name[1], 15)}</p>
                        </div>
                        <div>
                            {track.album ?
                                <p>{useTextLength(track.album.name[1], 15)}</p>
                                :
                                null
                            }
                        </div>
                        <div>
                            <p>{new Date(track.createdTime).toLocaleDateString()}</p>
                        </div>
                        <div className={styles.editButtonContainer}>
                            <ControlOutlined onClick={() => router.push(`/pth/hub/artist/edit_track/${track._id}`)} className={styles.editButton}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditTrackTool;