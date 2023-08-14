import React, {useState} from 'react';
import {notification} from "antd";

import styles from "./styles/AddEntityTool.module.css";
import UploadFile from "@/util/UploadFile";
import {useAddTrackMutation} from "@/store/api/TrackApi";
import PickedGenresList from "@/components/Content/ArtistTools/components/PickedGenresList";
import InputFields from "@/components/Content/ArtistTools/components/InputFields";
import LoadingLine from "@/components/Content/components/LoadingLine";
import ConfirmHandler from "@/components/Content/components/ConfirmHandler";

const AddTrackTool = () => {

    const [image, setImage] = useState<File>(null)
    const [previewImage, setPreviewImage] = useState()
    const [audio, setAudio] = useState<File>(null)
    const [previewAudio, setPreviewAudio] = useState()

    const [name, setName] = useState<string>(null)
    const [description, setDescription] = useState<string>(null)
    const [pickedGenres, setPickedGenres] = useState([])
    const [confirm, setConfirm] = useState(false)

    const [addTrack, {isLoading}] = useAddTrackMutation()

    const handleUpload = () => {

        if (name && description && pickedGenres.length !== 0 && image && audio) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            pickedGenres.forEach(genre => formData.append('genres', genre))
            formData.append('image', image)
            formData.append('audio', audio)
            addTrack(formData)

            setName(null)
            setDescription(null)
            setImage(null)
            setAudio(null)
            setPreviewImage(null)
            setPreviewAudio(null)
            setPickedGenres([])
            setConfirm(false)

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p style={{color: 'white'}}>Done!</p>,
                description: <p style={{color: 'white'}}>Track add successfully</p>,
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
                        <h1 className={styles.title}>Upload track</h1>
                        <div className={styles.uploadContainer}>
                            <div className={styles.filesContainer}>
                                <UploadFile
                                    type={'image'}
                                    file={image}
                                    setFile={setImage}
                                    preview={previewImage}
                                    setPreview={setPreviewImage}
                                />
                                <UploadFile
                                    type={'audio'}
                                    file={audio}
                                    setFile={setAudio}
                                    preview={previewAudio}
                                    setPreview={setPreviewAudio}/>
                            </div>
                            <InputFields type={'create'} title={'track'} setName={setName} setDescription={setDescription}/>
                        </div>
                        <h1 className={styles.title}>Add genre</h1>
                        <PickedGenresList pickedGenres={pickedGenres} setPickedGenres={setPickedGenres}/>
                        <ConfirmHandler confirm={confirm} setConfirm={setConfirm} handleUpload={handleUpload}/>
                    </div>
            }
        </>
    );
};

export default AddTrackTool;