import React, {useState} from 'react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
    MinusOutlined,
    PlusOutlined
} from "@ant-design/icons";

import styles from "./styles/AddEntityTool.module.css";
import {useAddAlbumMutation} from "@/store/api/AlbumApi";
import PickedGenresList from "@/components/Content/ArtistTools/components/PickedGenresList";
import UploadFile from "@/util/UploadFile";
import {ConfigProvider, Input, notification} from "antd";
import PreviewPlayer from "@/components/Player/PreviewPlayer";

const uuid = () => `${new Date().getTime()}`

const AddAlbumTool = () => {

    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)

    const [tracksUploadList, setTracksUploadList] = useState([{
        id: uuid(),
        track: null,
        trackName: '',
        previewUrl: null
    }])
    const [pickedGenres, setPickedGenres] = useState([])
    const [confirm, setConfirm] = useState(false)

    const [addAlbum, {isLoading}] = useAddAlbumMutation()

    const handleAddAlbum = () => {
        if (name && description && image && tracksUploadList.filter(track => track.track && track.trackName).length === tracksUploadList.length && pickedGenres.length !== 0) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('image', image)
            pickedGenres.forEach(genre => formData.append('genres', genre))
            tracksUploadList.forEach(track => {
                formData.append('audio', track.track)
                formData.append('trackName', track.trackName)
            })

            addAlbum(formData)

            setImage(null)
            setPreviewImage(null)
            setTracksUploadList([{id: uuid(), track: null, trackName: '', previewUrl: null}])
            setPickedGenres([])

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

    const handleAddTrackRow = () => {
        setTracksUploadList(prevForm => [...prevForm, {id: uuid(), track: null, trackName: '', previewUrl: null}])
    }

    const handleRemoveTrackRow = (index) => {
        let list = [...tracksUploadList]
        list.splice(index, 1)
        setTracksUploadList(list)
    }

    const handleAddTrackName = (e, index) => {
        const {value} = e.target
        const list = [...tracksUploadList]

        list[index].trackName = value
        setTracksUploadList(list)
    }

    const handleAddTrack = (e, index) => {
        const list = [...tracksUploadList]

        list[index].track = e.target.files[0]
        list[index].previewUrl = URL.createObjectURL(e.target.files[0])

        setTracksUploadList(list)
    }

    const handleRemoveTrack = (index) => {
        const list = [...tracksUploadList]

        list[index].track = null
        list[index].previewUrl = null

        setTracksUploadList(list)
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
                        <h1 className={styles.title}>Upload Album</h1>
                        <div className={styles.uploadContainer}>
                            <div className={styles.filesContainer}>
                                <UploadFile
                                    type={'image'}
                                    file={image}
                                    setFile={setImage} preview={previewImage}
                                    setPreview={setPreviewImage}
                                />
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
                                        <p className={styles.inputTitle}>Album Name</p>
                                        <Input onChange={e => setName(e.target.value)} className={styles.inputField}/>
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <p className={styles.inputTitle}>Album Description</p>
                                        <Input.TextArea onChange={e => setDescription(e.target.value)}
                                                        className={styles.inputField}/>
                                    </div>
                                </ConfigProvider>
                            </div>
                        </div>
                        <h1 className={styles.title}>Upload album's tracks</h1>
                        <form className={styles.formContainer} autoComplete={'off'}>
                            {tracksUploadList.map((trackUploadRow, index) =>
                                <div key={trackUploadRow.id}>
                                    <div className={styles.formEntity}>
                                        <div className={styles.filesContainer}>
                                            <div className={styles.fileContainer}>
                                                {
                                                    trackUploadRow.track ?
                                                        <CheckCircleOutlined className={styles.fileUploaded}/>
                                                        :
                                                        null
                                                }
                                                <p className={styles.fileContainerTitle}>Audio upload: </p>
                                                {
                                                    trackUploadRow.previewUrl ?
                                                        <PreviewPlayer url={trackUploadRow.previewUrl}/>
                                                        :
                                                        <>
                                                            <label onChange={e => handleAddTrack(e, index)}
                                                                   className={styles.fileButton}>
                                                                <PlusOutlined/>
                                                                <input hidden={true} type={'file'}
                                                                       accept={`audio/*`}/>
                                                            </label>
                                                        </>
                                                }
                                                {
                                                    trackUploadRow.track ?
                                                        <CloseCircleOutlined
                                                            onClick={() => handleRemoveTrack(index)}
                                                            className={styles.fileRemove}
                                                        />
                                                        :
                                                        null
                                                }
                                            </div>
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
                                                    <Input
                                                        onChange={e => handleAddTrackName(e, index)}
                                                        className={styles.inputField}
                                                    />
                                                </div>
                                            </ConfigProvider>
                                        </div>
                                        <div className={styles.removeFormEntityContainer}>
                                            {tracksUploadList.length > 1 &&
                                                (<MinusOutlined
                                                    onClick={() => handleRemoveTrackRow(index)}
                                                    className={styles.removeFormEntityButton}
                                                />)
                                            }
                                        </div>
                                    </div>
                                    <div className={styles.addNewFormEntityContainer}>
                                        {tracksUploadList.length - 1 === index && tracksUploadList.length < 20 &&
                                            (<PlusOutlined
                                                onClick={handleAddTrackRow}
                                                className={styles.addNewFormEntityButton}
                                            />)
                                        }
                                    </div>
                                </div>
                            )}
                        </form>
                        <h1 className={styles.title}>Add Genre</h1>
                        <PickedGenresList pickedGenres={pickedGenres} setPickedGenres={setPickedGenres}/>
                        <div className={styles.confirmMainContainer}>
                            {confirm ?
                                <div className={styles.confirmContainer}>
                                    <p className={styles.confirmTitle}>Confirm ?</p>
                                    <p className={styles.confirmChoiceButtonYes} onClick={handleAddAlbum}>Yes</p>
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

export default AddAlbumTool;