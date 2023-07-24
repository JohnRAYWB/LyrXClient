import React from 'react';
import Image from "next/image";

import styles from "./styles/CollectionItem.module.css"
import useTextLength from "@/util/useTextLength";
import {useRouter} from "next/navigation";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {HeartFilled, HeartOutlined, LoadingOutlined} from "@ant-design/icons";
import {useScoreLength} from "@/util/useScoreLength";
import {
    useAddPlaylistToUserCollectionMutation,
    useRemovePlaylistFromUserCollectionMutation
} from "@/store/api/PlaylistApi";
import {useAddAlbumToUserCollectionMutation, useRemoveAlbumFromUserCollectionMutation} from "@/store/api/AlbumApi";
import {notification} from "antd";
import {handleAddPlaylist, handleRemovePlaylist} from "@/util/handlePlaylistControl";
import {handleAddAlbum, handleRemoveAlbum} from "@/util/handleAlbumControl";

interface CollectionItem {
    item: playlistDto | albumDto
    type: string
}

const CollectionItem: React.FC<CollectionItem> = ({item, type}) => {

    const {data: user, isLoading} = useFetchProfileQuery()
    const [addPlaylist, {isLoading: playlistAddLoading}] = useAddPlaylistToUserCollectionMutation()
    const [removePlaylist, {isLoading: playlistRemoveLoading}] = useRemovePlaylistFromUserCollectionMutation()
    const [addAlbum, {isLoading: albumAddLoading}] = useAddAlbumToUserCollectionMutation()
    const [removeAlbum, {isLoading: albumRemoveLoading}] = useRemoveAlbumFromUserCollectionMutation()

    if (isLoading) {
        return
    }

    const router = useRouter()

    const score = useScoreLength(item.favorites)

    const nameLength = useTextLength(item.name[1], 40)
    const descriptionLength = useTextLength(item.description, 40)

    return (
        <div className={styles.main}>
                <Image
                    className={styles.image}
                    priority={true} width={160}
                    height={160}
                    quality={50}
                    src={`http://localhost:4221/${type}/${item.name[0]}/${item.image}`}
                    alt={'collection_logo'}
                    onClick={() => router.push(`/pth/hub/${type}/${item._id}`)}
                />
                <div className={styles.textContainer} onClick={() => router.push(`/pth/hub/${type}/${item._id}`)}>
                    <h1 className={styles.name}>{`${item.name[0]} - ${nameLength}`}</h1>
                    <p className={styles.description}>{descriptionLength}</p>
                </div>
            <div className={styles.actionContainer}>
                <div className={styles.favInfo}>
                    <p className={styles.favText}>Fav</p>
                    <p className={styles.favScore}>{score}</p>
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
                                                    <HeartFilled onClick={() => handleRemovePlaylist(removePlaylist, item._id)}
                                                                 className={styles.favActionFill}/>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                playlistAddLoading ?
                                                    <LoadingOutlined className={styles.loading}/>
                                                    :
                                                    <HeartOutlined onClick={() => handleAddPlaylist(addPlaylist, item._id)}
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
                                                    <HeartFilled onClick={() => handleRemoveAlbum(removeAlbum, item._id)}
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