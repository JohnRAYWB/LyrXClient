import React from 'react';
import styles from "@/components/Content/ArtistTools/styles/AddTrackTool.module.css";
import Image from "next/image";
import {CheckCircleOutlined, CloseCircleOutlined, PlusOutlined} from "@ant-design/icons";
import PreviewPlayer from "@/components/Player/PreviewPlayer";

interface Param {
    type: string
    file: object
    preview: object
    setPreview: Function
    setFile: Function
}

const UploadFile: React.FC<Param> = ({type, file, preview, setPreview, setFile}) => {

    let objectUrl

    const handleUpload = (e) => {
        objectUrl = URL.createObjectURL(e.target.files[0])
        setFile(e.target.files[0])
        setPreview(objectUrl)
        console.log(e.target.files);
    }
    const handleRemove = () => {
        URL.revokeObjectURL(objectUrl)
        setFile(null)
        setPreview(null)
    }

    return (
        <div>
            {type === 'image' ?
                <div className={styles.fileContainer}>
                    {file ? <CheckCircleOutlined className={styles.fileUploaded}/> : null}
                    <p className={styles.fileContainerTitle}>Image upload: </p>
                    {preview ?
                        <Image width={100} height={100} src={preview} alt={'logo'}/>
                        :
                        <>
                            <label onChange={handleUpload} className={styles.fileButton}>
                                <PlusOutlined/>
                                <input multiple={true} hidden={true} type={'file'} accept={`${type}/*`}/>
                            </label>
                        </>
                    }
                    {file ? <CloseCircleOutlined onClick={handleRemove} className={styles.fileRemove}/> : null}
                </div>
                :
                null
            }

            {type === 'audio' ?
                <div className={styles.fileContainer}>
                    {file ? <CheckCircleOutlined className={styles.fileUploaded}/> : null}
                    <p className={styles.fileContainerTitle}>Audio upload: </p>
                    {preview ?
                        // <audio className={styles.audioContainer} controls src={preview}/>
                        <PreviewPlayer url={preview}/>
                        :
                        <>
                            <label onChange={handleUpload} className={styles.fileButton}>
                                <PlusOutlined/>
                                <input multiple={true} hidden={true} type={'file'} accept={`${type}/*`}/>
                            </label>
                        </>
                    }
                    {file ? <CloseCircleOutlined onClick={handleRemove} className={styles.fileRemove}/> : null}
                </div>
                :
                null
            }
        </div>
    );
};

export default UploadFile;