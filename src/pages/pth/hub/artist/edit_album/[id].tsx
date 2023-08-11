import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import styles from "@/components/Content/ArtistTools/styles/EditAlbumPage.module.css"
import {useEditAlbumDescriptionMutation, useEditAlbumImageMutation, useFetchAlbumByIdQuery} from "@/store/api/AlbumApi";
import Image from "next/image";
import {albumImagePath} from "@/util/ImagePath";
import useTextLength from "@/util/useTextLength";
import ScoreContainer from "@/components/Content/components/ScoreContainer";
import {Popover} from "antd";
import {useFetchArtistsTracksAndSearchQuery} from "@/store/api/TrackApi";
import InputFields from "@/components/Content/ArtistTools/components/InputFields";
import UploadFile from "@/util/UploadFile";
import TrackControl from "@/components/Content/ArtistTools/components/TrackControl";
import EditGenre from "@/components/Content/ArtistTools/components/EditGenre";
import ConfirmHandler from "@/components/Content/components/ConfirmHandler";
import {LoadingOutlined} from "@ant-design/icons";

interface Param {
    albumId: string
}

const EditAlbumPage: NextPageWithLayout<Param> = ({albumId}) => {

    const [edit, setEdit] = useState(false)
    const [confirmDescription, setConfirmDescription] = useState(false)
    const [confirmImage, setConfirmImage] = useState(false)
    const [name, setName] = useState<string>(null)
    const [description, setDescription] = useState<string>(null)
    const [image, setImage] = useState<File>(null)
    const [preview, setPreview] = useState<File>(null)

    const {data: album, isLoading: albumLoading} = useFetchAlbumByIdQuery(albumId)
    const {data: tracks, isLoading: tracksLoading} = useFetchArtistsTracksAndSearchQuery('')

    const [editDescription, {isLoading: editDescriptionLoading}] = useEditAlbumDescriptionMutation()
    const [editImage, {isLoading: editImageLoading}] = useEditAlbumImageMutation()

    if (albumLoading || tracksLoading) {
        return <></>
    }

    const singles = tracks.filter(track => !track.protectedDeletion)

    const handleEditDescription = () => {
        if (name) {
            const albumName = [album.name[0], name]
            editDescription({aId: album._id, name: albumName})

            setName(null)
        }
        if (description) {
            editDescription({aId: album._id, description: description})

            setDescription(null)
        }

        setConfirmDescription(false)
    }

    const handleUploadImage = () => {
        if (image) {
            const formData = new FormData()

            formData.append('image', image)
            editImage({aId: album._id, image: formData})

            setImage(null)
            setPreview(null)
            setConfirmImage(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.albumMain}>
                <div className={styles.albumContainer}>
                    <Image
                        className={styles.image}
                        width={150}
                        height={150}
                        priority={true}
                        src={albumImagePath(album)}
                        alt={'album_logo'}
                    />
                    <p className={styles.albumName}>{useTextLength(album.name[1], 15)}</p>
                    <Popover content={album.description} title={'Description'}>
                        <p className={styles.albumDescription}>{useTextLength(album.description, 15)}</p>
                    </Popover>
                    <ScoreContainer title={'Favorites'} count={album.favorites}/>
                    <div className={styles.addedGenres}>
                        {album.genre.map(genre => <p key={genre._id}>{genre.name}</p>)}
                    </div>
                </div>
                {edit ?
                    <div className={styles.editAlbumContainer}>
                        <div className={styles.editComponentContainer}>
                            <p className={styles.editComponentTitle}>Genre Control</p>
                            <EditGenre type={'album'} entity={album}/>
                        </div>
                        <div>
                            {editDescriptionLoading ?
                                <div className={styles.loadingContainer}>
                                    <LoadingOutlined className={styles.loadingSpinner}/>
                                </div>
                                :
                                <div className={styles.editComponentContainer}>
                                    <p className={styles.editComponentTitle}>Edit info</p>
                                    <InputFields type={'create'} title={'album'} setName={setName}
                                                 setDescription={setDescription}/>
                                    <div>
                                        {editDescriptionLoading ?
                                            <LoadingOutlined className={styles.loadingSpinner}/>
                                            :
                                            <>
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
                            }
                        </div>
                        {editImageLoading ?
                            <div className={styles.loadingContainer}>
                                <LoadingOutlined className={styles.loadingSpinner}/>
                            </div>
                            :
                            <div className={styles.editComponentContainer}>
                                <p className={styles.editComponentTitle}>Edit image</p>
                                <UploadFile type={'image'} file={image} setFile={setImage} preview={preview}
                                            setPreview={setPreview}/>
                                {image ?
                                    <ConfirmHandler
                                        confirm={confirmImage}
                                        setConfirm={setConfirmImage}
                                        handleUpload={handleUploadImage}
                                    />
                                    :
                                    null
                                }
                            </div>
                        }
                    </div>
                    :
                    null
                }
            </div>
            <div className={styles.tracksContainer}>
                <TrackControl type={'remove'} edit={edit} album={albumId} tracks={album.tracks}/>
                {edit ?
                    <TrackControl type={'add'} edit={edit} album={albumId} tracks={singles}/>
                    :
                    null
                }
            </div>
            <div className={styles.editButtonContainer}>
                <p className={styles.editButton} onClick={() => setEdit(!edit)}>Edit</p>
            </div>
        </div>
    );
};

EditAlbumPage.getLayout = (page: React.ReactNode) => <MainLayout name={'Edit Album Page'}>{page}</MainLayout>

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
                albumId: ctx.params.id
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default EditAlbumPage;