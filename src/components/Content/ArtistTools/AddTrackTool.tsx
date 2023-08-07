import React, {useState} from 'react';
import {ConfigProvider, Input, notification} from "antd";

import styles from "./styles/AddEntityTool.module.css";
import UploadFile from "@/util/UploadFile";
import {useAddTrackMutation} from "@/store/api/TrackApi";
import {LoadingOutlined} from "@ant-design/icons";
import PickedGenresList from "@/components/Content/ArtistTools/components/PickedGenresList";

const AddTrackTool = () => {

    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState()
    const [audio, setAudio] = useState(null)
    const [previewAudio, setPreviewAudio] = useState()

    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
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

            setImage(null)
            setAudio(null)
            setPreviewImage(null)
            setPreviewAudio(null)
            setPickedGenres([])

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
                    <div className={styles.loadingContainer}>
                        <p className={styles.loadingTitle}>Processing</p>
                        <LoadingOutlined className={styles.loadingSpinner}/>
                    </div>
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
                            <div className={styles.inputsContainer}>
                                <ConfigProvider theme={{
                                    token: {
                                        colorBorder: '#232323FF',
                                        colorTextPlaceholder: '#404040',
                                        colorPrimary: '#ff2929',
                                    }
                                }}>
                                    <div className={styles.inputContainer}>
                                        <p className={styles.inputTitle}>Track Name</p>
                                        <Input onChange={e => setName(e.target.value)} className={styles.inputField}/>
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <p className={styles.inputTitle}>Track Description</p>
                                        <Input.TextArea onChange={e => setDescription(e.target.value)}
                                                        className={styles.inputField}/>
                                    </div>
                                </ConfigProvider>
                            </div>
                        </div>
                        <h1 className={styles.title}>Add genre</h1>
                        <PickedGenresList pickedGenres={pickedGenres} setPickedGenres={setPickedGenres}/>
                        <div className={styles.confirmMainContainer}>
                            {confirm ?
                                <div className={styles.confirmContainer}>
                                    <p className={styles.confirmTitle}>Confirm ?</p>
                                    <p className={styles.confirmChoiceButtonYes} onClick={handleUpload}>Yes</p>
                                    <p className={styles.confirmChoiceButtonNo}
                                       onClick={() => setConfirm(!confirm)}>No</p>
                                </div>
                                :
                                <p className={styles.confirmButton} onClick={() => setConfirm(!confirm)}>Complete</p>
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default AddTrackTool;