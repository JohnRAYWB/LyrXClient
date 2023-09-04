import React, {useState} from 'react';
import {notification} from "antd";

import styles from "../../../styles/EditEntity.module.css";
import EntityInfo from "@/components/Content/ToolsPage/components/EditEntities/EntityInfo";
import {userDto} from "@/api/dto/user.dto";
import {trackDto} from "@/api/dto/track.dto";
import {useFetchAllArtistsAndSearchQuery} from "@/store/api/UserApi";
import {useEditTrackArtistMutation} from "@/store/api/TrackApi";
import {LoadingOutlined} from "@ant-design/icons";
import ArtistsList from "@/components/Content/ToolsPage/components/EditEntities/ArtistsList";

interface Param {
    track: trackDto
}

const EditTrack: React.FC<Param> = ({track}) => {

    const [artistName, setArtistName] = useState(null)
    const [edit, setEdit] = useState(false)
    const [selectedArtist, setSelectedArtist] = useState<userDto>(null)

    const {data: artists, isLoading} = useFetchAllArtistsAndSearchQuery(artistName)
    const [editArtist, {isLoading: editLoading}] = useEditTrackArtistMutation()

    if (isLoading) {
        return <></>
    }

    const handleInput = (e) => {
        setArtistName(e.target.value)
    }

    const handleEditArtist = () => {
        if (selectedArtist && selectedArtist._id) {
            editArtist({tId: track._id, artist: selectedArtist._id})

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Done!</p>,
                description: <p className={styles.notification}>Artist changed successfully</p>,
                placement: "bottomLeft",
                duration: 2
            })
        } else {
            notification.error({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Error!</p>,
                description: <p className={styles.notification}>You don't pick an artist</p>,
                placement: "bottomLeft",
                duration: 2
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.entityInfoContainer}>
                <EntityInfo entity={track} type={'track'}/>
                <p onClick={() => setEdit(!edit)} className={styles.editButton}>Edit</p>
            </div>
            {
                edit ?
                    <div className={styles.editContainer}>
                        <h1 className={styles.editTitle}>Change track's artist</h1>
                        {editLoading ?
                            <div className={styles.loadingContainer}>
                                <LoadingOutlined className={styles.loadingGreen}/>
                            </div>
                            :
                            <div className={styles.editSelect}>
                                <input
                                    className={styles.input}
                                    onChange={handleInput}
                                    placeholder={'Input artist name'}
                                />
                                <p onClick={handleEditArtist} className={styles.changeButton}>
                                    Change artist
                                </p>
                            </div>
                        }
                        {artistName ?
                            <ArtistsList
                                artists={artists}
                                selectedArtist={selectedArtist}
                                setSelectedArtist={setSelectedArtist}
                            />
                            :
                            null
                        }
                    </div>
                    :
                    null
            }
        </div>
    );
};

export default EditTrack;