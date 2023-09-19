import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import Image from "next/image";
import {Popover} from "antd";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import styles from "@/components/Content/PlaylistTool/styles/EditPlaylist.module.css"
import {playlistImagePath} from "@/util/ImagePath";
import useTextLength from "@/util/useTextLength";
import PlaylistsTrackList from "@/components/Content/PlaylistTool/components/PlaylistsTrackList";
import {
    useDeletePlaylistMutation,
    useEditPlaylistDescriptionMutation,
    useEditPlaylistImageMutation,
    useFetchPlaylistByIdQuery
} from "@/store/api/PlaylistApi";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import InputFields from "@/components/Content/ArtistTools/components/InputFields";
import ConfirmHandler from "@/components/Content/components/ConfirmHandler";
import UploadFile from "@/util/UploadFile";
import EditGenre from "@/components/Content/ArtistTools/components/EditGenre";
import {LoadingOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

interface Param {
    playlistId: string
}

const EditPlaylist: NextPageWithLayout<Param> = ({playlistId}) => {

    const [edit, setEdit] = useState(false)
    const [deleteState, setDeleteState] = useState(false)
    const [confirmDescription, setConfirmDescription] = useState(false)
    const [confirmImage, setConfirmImage] = useState(false)
    const [name, setName] = useState<string>(null)
    const [description, setDescription] = useState<string>(null)
    const [image, setImage] = useState<File>(null)
    const [preview, setPreview] = useState(null)

    const {data: playlist, isLoading: playlistLoading} = useFetchPlaylistByIdQuery(playlistId)
    const {data: user, isLoading: userLoading} = useFetchProfileQuery()

    const [editDescription, {isLoading: editDescriptionLoading}] = useEditPlaylistDescriptionMutation()
    const [editImage, {isLoading: editImageLoading}] = useEditPlaylistImageMutation()
    const [deletePlaylist, {isLoading: deleteLoading}] = useDeletePlaylistMutation()

    if (playlistLoading || userLoading) {
        return <></>
    }

    const router = useRouter()

    const handleEditDescription = () => {

        if (name) {
            const playlistName = [playlist.name[0], name]
            editDescription({pId: playlist._id, name: playlistName})

            setName(null)
        }

        if (description) {
            editDescription({pId: playlist._id, description: description})

            setDescription(null)
        }

        setConfirmDescription(false)
    }

    const handleEditImage = () => {

        if (image) {
            const formData = new FormData()
            formData.append('image', image)

            editImage({pId: playlist._id, image: formData})

            setImage(null)
            setPreview(null)
        }

        setConfirmImage(false)
    }

    const handleDeletePlaylist = () => {
        try {
            deletePlaylist(playlist._id)
            router.push('/pth/hub/playlist/list')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {
                deleteLoading ?
                    <div className={styles.loadingContainer}>
                        <LoadingOutlined className={styles.loadingSpinner}/>
                    </div>
                    :
                    <div className={styles.container}>
                        <div className={styles.mainInfoContainer}>
                            <div className={styles.infoContainer}>
                                <Image
                                    className={styles.image}
                                    width={150}
                                    height={150}
                                    priority={true}
                                    src={playlistImagePath(playlist)}
                                    alt={'playlist_logo'}
                                />
                                <div className={styles.descriptionContainer}>
                                    <h1 className={styles.playlistName}>{useTextLength(playlist.name[1], 15)}</h1>
                                    <Popover content={playlist.description} title={'Description'}>
                                        <p className={styles.playlistDescription}>{useTextLength(playlist.description, 15)}</p>
                                    </Popover>
                                    <div className={styles.genresContainer}>
                                        {playlist.genre.map(genre => <p key={genre._id}>{genre.name}</p>)}
                                    </div>
                                </div>
                            </div>
                            {edit ?
                                <div className={styles.editInfoContainer}>
                                    <EditGenre type={'playlist'} entity={playlist}/>
                                    <div className={styles.editElementContainer}>
                                        {editDescriptionLoading ?
                                            <div className={styles.loadingContainer}>
                                                <LoadingOutlined className={styles.loadingSpinner}/>
                                            </div>
                                            :
                                            <>
                                                <InputFields
                                                    type={'create'}
                                                    title={'playlist'}
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
                                    <div className={styles.editElementContainer}>
                                        {editImageLoading ?
                                            <div className={styles.loadingContainer}>
                                                <LoadingOutlined className={styles.loadingSpinner}/>
                                            </div>
                                            :
                                            <>
                                                <UploadFile
                                                    type={'image'}
                                                    file={image}
                                                    setFile={setImage}
                                                    preview={preview}
                                                    setPreview={setPreview}
                                                />
                                                {image ?
                                                    <ConfirmHandler
                                                        confirm={confirmImage}
                                                        setConfirm={setConfirmImage}
                                                        handleUpload={handleEditImage}
                                                    />
                                                    :
                                                    null
                                                }
                                            </>
                                        }
                                    </div>
                                    <div>
                                        <ConfirmHandler
                                            confirm={deleteState}
                                            setConfirm={setDeleteState}
                                            handleUpload={handleDeletePlaylist}
                                            type={'delete'}
                                        />
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                        <div className={styles.tracksMainContainer}>
                            {playlist.tracks.length === 0 ?
                                <div className={styles.tracksContainer}>
                                    <h1 className={styles.emptyList}>Tracks list is empty</h1>
                                </div>
                                :
                                <div className={styles.tracksContainer}>
                                    {playlist.tracks.map((track, index) =>
                                        <PlaylistsTrackList key={track._id} track={track} playlistId={playlistId}
                                                            user={user}
                                                            index={index}/>
                                    )}
                                </div>
                            }
                        </div>
                        <div className={styles.editContainer}>
                            <p onClick={() => setEdit(!edit)} className={styles.editButton}>Edit</p>
                        </div>
                    </div>
            }
        </>
    );
};

EditPlaylist.getLayout = (page: React.ReactNode) => <MainLayout name={'Edit Playlist'}>{page}</MainLayout>

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
                playlistId: ctx.params.id
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default EditPlaylist;