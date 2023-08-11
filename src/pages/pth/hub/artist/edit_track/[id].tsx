import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import Image from "next/image";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import styles from "@/components/Content/ArtistTools/styles/EditTrackPage.module.css"
import PreviewPlayer from "@/components/Player/PreviewPlayer";
import {
    useEditTrackAudioMutation,
    useEditTrackDescriptionMutation,
    useEditTrackImageMutation,
    useFetchTrackByIdQuery
} from "@/store/api/TrackApi";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {albumsTrackImagePath, trackImagePath} from "@/util/ImagePath";
import {trackAudioPath} from "@/util/AudioPath";
import UploadFile from "@/util/UploadFile";
import InputFields from "@/components/Content/ArtistTools/components/InputFields";
import {useScoreLength} from "@/util/useScoreLength";
import useTextLength from "@/util/useTextLength";
import ConfirmHandler from "@/components/Content/components/ConfirmHandler";
import EditGenre from "@/components/Content/ArtistTools/components/EditGenre";
import {LoadingOutlined} from "@ant-design/icons";

interface Param {
    trackId: string
}

const EditTrackPage: NextPageWithLayout<Param> = ({trackId}) => {

    const [edit, setEdit] = useState(false)
    const [confirmDescription, setConfirmDescription] = useState(false)
    const [confirmAudio, setConfirmAudio] = useState(false)
    const [confirmImage, setConfirmImage] = useState(false)

    const [name, setName] = useState<string>(null)
    const [description, setDescription] = useState<string>(null)
    const [image, setImage] = useState<File>(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [audio, setAudio] = useState<File>(null)
    const [audioPreview, setAudioPreview] = useState(null)

    const {data: track, isLoading} = useFetchTrackByIdQuery(trackId)
    const {data: user, isLoading: userLoading} = useFetchProfileQuery()
    const [editDescription, {isLoading: editDescriptionLoading}] = useEditTrackDescriptionMutation()
    const [editImage, {isLoading: editImageLoading}] = useEditTrackImageMutation()
    const [editAudio, {isLoading: editAudioLoading}] = useEditTrackAudioMutation()

    if (isLoading || userLoading) {
        return <></>
    }

    if (user.roles.findIndex(role => role.role === 'artist') === -1) {
        return <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
    }

    const handleEditDescription = () => {
        if (name) {
            const trackName = [track.name[0], name]
            editDescription({tId: track._id, name: trackName})

            setName(null)
        }
        if (description) {
            editDescription({tId: track._id, description: description})

            setDescription(null)
        }

        setConfirmDescription(false)
    }

    const handleEditAudio = () => {
        if (audio) {
            const formData = new FormData()
            formData.append('audio', audio)

            editAudio({tId: track._id, audio: formData})

            setAudio(null)
            setAudioPreview(null)
            setConfirmAudio(false)
        }
    }

    const handleEditImage = () => {
        if (image) {
            const formData = new FormData()

            formData.append('image', image)
            editImage({tId: track._id, image: formData})

            setImage(null)
            setImagePreview(null)
            setConfirmImage(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.editButtonContainer}>
                <p className={styles.editButton} onClick={() => setEdit(!edit)}>Edit</p>
            </div>
            <div className={styles.trackContainer}>
                <div className={styles.trackInfoContainer}>
                    <Image
                        className={styles.image}
                        width={100}
                        height={100}
                        priority={true}
                        src={track.protectedDeletion ? albumsTrackImagePath(track) : trackImagePath(track)}
                        alt={'track_logo'}
                    />
                    <p className={styles.trackName}>{useTextLength(track.name[1], 15)}</p>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Listens</p>
                        <p className={styles.scoreCounter}>{useScoreLength(track.listens)}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Favorites</p>
                        <p className={styles.scoreCounter}>{useScoreLength(track.favorites)}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        <p className={styles.scoreTitle}>Comments count</p>
                        <p className={styles.scoreCounter}>{useScoreLength(track.commentCount)}</p>
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <div className={styles.genreList}>
                        <p className={styles.description}>GENRES:</p>
                        {track.genre.map(genre => <p key={genre._id} className={styles.genre}>{genre.name}</p>)}
                    </div>
                    <p className={styles.description}>DESCRIPTION: {track.description}</p>
                </div>
                <div className={styles.playerContainer}>
                    <h1 className={styles.title}>Current track</h1>
                    <PreviewPlayer url={trackAudioPath(track)}/>
                </div>
            </div>
            {edit ?
                <div>
                    <div className={styles.editContainer}>
                        <div className={styles.editGenre}>
                            <p className={styles.title}>Genre control</p>
                            <EditGenre type={'track'} entity={track}/>
                        </div>
                        <div className={styles.editMediaContainer}>
                            <div className={styles.filesContainer}>
                                {!track.protectedDeletion ?
                                    <>
                                        {editImageLoading ?
                                            <div className={styles.fileContainer}>
                                                <LoadingOutlined className={styles.loadingSpinner}/>
                                            </div>
                                            :
                                            <>
                                                <div className={styles.fileContainer}>
                                                    <UploadFile type={'image'} file={image} setFile={setImage}
                                                                preview={imagePreview} setPreview={setImagePreview}
                                                    />
                                                    {image ?
                                                        <ConfirmHandler confirm={confirmImage}
                                                                        setConfirm={setConfirmImage}
                                                                        handleUpload={handleEditImage}/>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </>
                                        }
                                    </>
                                    :
                                    null
                                }

                                {editAudioLoading ?
                                    <div className={styles.fileContainer}>
                                        <LoadingOutlined className={styles.loadingSpinner}/>
                                    </div>
                                    :
                                    <div className={styles.fileContainer}>
                                        <UploadFile
                                            type={'audio'}
                                            file={audio}
                                            setFile={setAudio}
                                            preview={audioPreview}
                                            setPreview={setAudioPreview}
                                        />
                                        {audio ?
                                            <ConfirmHandler confirm={confirmAudio}
                                                            setConfirm={setConfirmAudio}
                                                            handleUpload={handleEditAudio}/>
                                            :
                                            null
                                        }
                                    </div>
                                }
                            </div>
                            <div className={styles.editDescriptionContainer}>
                                {editDescriptionLoading ?
                                    <LoadingOutlined className={styles.loadingSpinner}/>
                                    :
                                    <>
                                        <InputFields
                                            type={'create'}
                                            title={'track'}
                                            setName={setName}
                                            setDescription={setDescription}
                                        />
                                        {name || description ?
                                            <ConfirmHandler
                                                confirm={confirmDescription}
                                                setConfirm={setConfirmDescription}
                                                handleUpload={handleEditDescription}
                                            />
                                            :
                                            null
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
};

EditTrackPage.getLayout = (page: React.ReactNode) => <MainLayout name={'Edit Track Page'}>{page}</MainLayout>

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if (!access_token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        return {
            props: {
                trackId: ctx.params.id
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default EditTrackPage;