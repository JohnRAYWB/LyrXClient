import React, {useState} from 'react';

import styles from "@/components/Content/ArtistTools/styles/AddEntityTool.module.css";
import {useAddPlaylistMutation} from "@/store/api/PlaylistApi";
import UploadFile from "@/util/UploadFile";
import InputFields from "@/components/Content/ArtistTools/components/InputFields";
import PickedGenresList from "@/components/Content/ArtistTools/components/PickedGenresList";
import ConfirmHandler from "@/components/Content/components/ConfirmHandler";
import {notification} from "antd";
import LoadingLine from "@/components/Content/components/LoadingLine";

const AddPlaylistTool = () => {

    const [image, setImage] = useState<File>(null)
    const [previewImage, setPreviewImage] = useState(null)

    const [name, setName] = useState<string>(null)
    const [description, setDescription] = useState<string>(null)
    const [pickedGenres, setPickedGenres] = useState([])
    const [confirm, setConfirm] = useState(false)

    const [addPlaylist, {isLoading}] = useAddPlaylistMutation()

    const handleAddPlaylist = () => {
        if (name && description && image && pickedGenres.length !== 0) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('image', image)
            pickedGenres.forEach(genre => formData.append('genres', genre))

            addPlaylist(formData)

            setName(null)
            setDescription(null)
            setImage(null)
            setPreviewImage(null)
            setPickedGenres([])
            setConfirm(null)

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p style={{color: 'white'}}>Done!</p>,
                description: <p style={{color: 'white'}}>Album add successfully</p>,
                duration: 2
            })
        } else {
            notification.error({
                style: {backgroundColor: "#646464", width: 300},
                message: <p style={{color: 'white'}}>Check again!</p>,
                description: <p style={{color: 'white'}}>One of the field is empty</p>,
                duration: 2
            })
        }
    }

    return (
        <>
            {
                isLoading ?
                    <LoadingLine/>
                    :
                    <div className={styles.container}>
                        <h1 className={styles.title}>Upload playlist</h1>
                        <div className={styles.uploadContainer}>
                            <div className={styles.filesContainer}>
                                <UploadFile
                                    type={'image'}
                                    file={image}
                                    setFile={setImage}
                                    preview={previewImage}
                                    setPreview={setPreviewImage}
                                />
                            </div>
                            <InputFields type={'create'} title={'playlist'} setName={setName}
                                         setDescription={setDescription}/>
                        </div>
                        <h1 className={styles.title}>Add genre</h1>
                        <PickedGenresList pickedGenres={pickedGenres} setPickedGenres={setPickedGenres}/>
                        <ConfirmHandler confirm={confirm} setConfirm={setConfirm} handleUpload={handleAddPlaylist}/>
                    </div>
            }
        </>
    );
};

export default AddPlaylistTool;