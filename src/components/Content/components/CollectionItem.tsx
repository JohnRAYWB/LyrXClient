import React, {useState} from 'react';
import Image from "next/image";

import styles from "./styles/CollectionItem.module.css"
import useTextLength from "@/util/useTextLength";
import {useRouter} from "next/navigation";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {CaretRightOutlined, HeartFilled, HeartOutlined, LoadingOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useScoreLength} from "@/util/useScoreLength";
import {
    useAddPlaylistToUserCollectionMutation,
    useRemovePlaylistFromUserCollectionMutation
} from "@/store/api/PlaylistApi";
import {useAddAlbumToUserCollectionMutation, useRemoveAlbumFromUserCollectionMutation} from "@/store/api/AlbumApi";
import {handleAddPlaylist, handleRemovePlaylist} from "@/util/handlePlaylistControl";
import {handleAddAlbum, handleRemoveAlbum} from "@/util/handleAlbumControl";
import {useAppDispatch} from "@/hook/redux";
import {setCurrentTrack} from "@/store/slice/player";

interface CollectionItem {
    item: playlistDto | albumDto
    type: string
}

const CollectionItem: React.FC<CollectionItem> = ({item, type}) => {

    const [showInfo, setShowInfo] = useState(false)

    const {data: user, isLoading} = useFetchProfileQuery()
    const [addPlaylist, {isLoading: playlistAddLoading}] = useAddPlaylistToUserCollectionMutation()
    const [removePlaylist, {isLoading: playlistRemoveLoading}] = useRemovePlaylistFromUserCollectionMutation()
    const [addAlbum, {isLoading: albumAddLoading}] = useAddAlbumToUserCollectionMutation()
    const [removeAlbum, {isLoading: albumRemoveLoading}] = useRemoveAlbumFromUserCollectionMutation()

    if (isLoading) {
        return
    }

    const router = useRouter()
    const dispatch = useAppDispatch()

    const handlePlayCollection = () => {
        dispatch(setCurrentTrack({
            tracksList: item.tracks,
            currentTrack: item.tracks[0],
            currentIndex: 0,
            isPlaying: true,
            isActive: true
        }))
    }

    return (
        <div className={styles.main}>
            <div
                className={styles.imageContainer}
                onMouseOver={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
            >
                <Image
                    className={styles.image}
                    priority={true}
                    width={180}
                    height={180}
                    src={`http://localhost:4221/${type}/${item.name[0]}/${item.image}`}
                    alt={'collection_logo'}
                />
                {showInfo &&
                    <div className={styles.overlay}>
                        <div className={styles.showInfoContainer}>
                            <CaretRightOutlined
                                className={styles.playButton}
                                onClick={() => item.tracks.length !== 0 ? handlePlayCollection() : null}
                            />
                            <div className={styles.tracksCount}>
                                <MenuUnfoldOutlined/>
                                <p>{item.tracks.length}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.textContainer} onClick={() => router.push(`/pth/hub/${type}/${item._id}`)}>
                <h1 className={styles.name}>{`${useTextLength(item.name[0], 10)} - ${useTextLength(item.name[1], 10)}`}</h1>
                <p className={styles.description}>{useTextLength(item.description, 20)}</p>
            </div>
            <div className={styles.actionContainer}>
                <div className={styles.favInfo}>
                    <p className={styles.favText}>Fav</p>
                    <p className={styles.favScore}>{useScoreLength(item.favorites)}</p>
                </div>
                <>
                    {
                        type === 'playlist' && user.playlists.findIndex(t => t._id === item._id) === -1 ?
                            <>
                                {
                                    user.playlistsCollection.findIndex(t => t._id === item._id) !== -1 ?
                                        <>
                                            {
                                                playlistRemoveLoading ?
                                                    <LoadingOutlined className={styles.loading}/>
                                                    :
                                                    <HeartFilled
                                                        onClick={() => handleRemovePlaylist(removePlaylist, item._id)}
                                                        className={styles.favActionFill}/>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                playlistAddLoading ?
                                                    <LoadingOutlined className={styles.loading}/>
                                                    :
                                                    <HeartOutlined
                                                        onClick={() => handleAddPlaylist(addPlaylist, item._id)}
                                                        className={styles.favActionEmpty}/>
                                            }
                                        </>
                                }
                            </>
                            :
                            null
                    }
                    {
                        type === 'album' && user.albums.findIndex(t => t._id === item._id) === -1 ?
                            <>
                                {
                                    user.albumsCollection.findIndex(t => t._id === item._id) !== -1 ?
                                        <>
                                            {
                                                albumRemoveLoading ?
                                                    <LoadingOutlined className={styles.loading}/>
                                                    :
                                                    <HeartFilled
                                                        onClick={() => handleRemoveAlbum(removeAlbum, item._id)}
                                                        className={styles.favActionFill}/>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                albumAddLoading ?
                                                    <LoadingOutlined className={styles.loading}/>
                                                    :
                                                    <HeartOutlined onClick={() => handleAddAlbum(addAlbum, item._id)}
                                                                   className={styles.favActionEmpty}/>
                                            }
                                        </>
                                }
                            </>
                            :
                            null
                    }
                </>
            </div>
        </div>
    );
};

export default CollectionItem;