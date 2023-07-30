import React, {useState} from 'react';

import styles from "./styles/EditTrack.module.css"
import {trackDto} from "@/api/dto/track.dto";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useFetchAllArtistsAndSearchQuery} from "@/store/api/UserApi";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import {useDeleteTrackMutation, useEditTrackArtistMutation} from "@/store/api/TrackApi";
import {notification} from "antd";
import {userDto} from "@/api/dto/user.dto";

interface Param {
    track: trackDto
    type: string
}

const EditTrack: React.FC<Param> = ({track, type}) => {

    const [artistName, setArtistName] = useState(null)
    const [edit, setEdit] = useState(false)
    const [selectedArtist, setSelectedArtist] = useState<userDto>(null)
    const [confirm, setConfirm] = useState(false)

    const {data: artists, isLoading} = useFetchAllArtistsAndSearchQuery(artistName)
    const [editArtist, {isLoading: editLoading}] = useEditTrackArtistMutation()
    const [deleteTrack, {isLoading: deleteLoading}] = useDeleteTrackMutation()

    if (isLoading) {
        return <></>
    }

    const router = useRouter()

    const handleInput = (e) => {
        setArtistName(e.target.value)
    }

    const handleEditArtist = () => {
        if (selectedArtist._id) {
            editArtist({tId: track._id, artist: selectedArtist._id})

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Done!</p>,
                description: <p className={styles.notification}>Artist changed successfully</p>,
                placement: "bottomLeft",
                duration: 2
            })
        }
    }

    const handleDelete = () => {
        deleteTrack(track._id)

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Track deleted successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    return (
        <div className={styles.container}>
            {deleteLoading ?
                <div className={styles.loadingDeleteContainer}>
                    <LoadingOutlined className={styles.loadingRed}/>
                </div>
            :
            <>
                <div className={styles.trackContainer}>
                    <Image
                        className={styles.image}
                        width={125}
                        height={125}
                        priority={true}
                        src={
                            track.protectedDeletion ?
                                `http://localhost:4221/album/${track.name[0]}/${track.image}`
                                :
                                `http://localhost:4221/track/${track.name[0]}/${track.image}`
                        }
                        alt={'track_logo'}
                    />
                    <div>
                        <p className={styles.trackName}>{track.name[1]}</p>
                        <p
                            onClick={() => router.push(`/pth/hub/users/${track.artist}`)}
                            className={styles.trackArtist}>{track.name[0]}
                        </p>
                    </div>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Favorites</p>
                        <p className={styles.scoreCount}>{track.favorites}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Listens</p>
                        <p className={styles.scoreCount}>{track.listens}</p>
                    </div>
                    {
                        type === 'edit' ?
                            <p onClick={() => setEdit(!edit)} className={styles.editButton}>Edit</p>
                            :
                            null
                    }
                    {
                        type === 'delete' ?
                            <>
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
                            </>
                            :
                            null
                    }
                </div>
                {
                    type === 'edit' ?
                        <>
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
                                                <p onClick={handleEditArtist} className={styles.changeButton}>Change
                                                    artist</p>
                                            </div>
                                        }
                                        {artistName ?
                                            <div className={styles.usersContainer}>
                                                {artists.map(artist =>
                                                    <div
                                                        className={selectedArtist === artist ? styles.selectedArtist : styles.userContainer}
                                                        onClick={() => setSelectedArtist(artist)}>
                                                        {artist.avatar ?
                                                            <Image
                                                                className={styles.avatar}
                                                                width={50}
                                                                height={50}
                                                                priority={true}
                                                                quality={50}
                                                                src={`http://localhost:4221/profile/${artist.username}/${artist.avatar}`}
                                                                alt={'artist_avatar'}
                                                            />
                                                            :
                                                            <UserOutlined className={styles.emptyAvatar}/>
                                                        }
                                                        <p>{artist.username}</p>
                                                        <div className={styles.scoreEditContainer}>
                                                            <p className={styles.scoreTitleEdit}>followers</p>
                                                            <p className={styles.scoreCountEdit}>{artist.followers.length}</p>
                                                        </div>
                                                        <div className={styles.scoreEditContainer}>
                                                            <p className={styles.scoreTitleEdit}>tracks</p>
                                                            <p className={styles.scoreCountEdit}>{artist.tracks.length}</p>
                                                        </div>
                                                        <div className={styles.scoreEditContainer}>
                                                            <p className={styles.scoreTitleEdit}>albums</p>
                                                            <p className={styles.scoreCountEdit}>{artist.albums.length}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    :
                                    null
                            }
                        </>
                        :
                        null
                }
            </>
            }
        </div>
    );
};

export default EditTrack;