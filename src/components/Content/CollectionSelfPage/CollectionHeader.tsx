import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Popover} from "antd";
import {HeartFilled, HeartOutlined, InfoCircleOutlined, LoadingOutlined} from "@ant-design/icons";

import styles from './styles/CollectionHeader.module.css'
import TrackList from "@/components/Content/TrackPage/TrackList";
import useTextLength from "@/util/useTextLength";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {
    useAddPlaylistToUserCollectionMutation,
    useRemovePlaylistFromUserCollectionMutation
} from "@/store/api/PlaylistApi";
import {useAddAlbumToUserCollectionMutation, useRemoveAlbumFromUserCollectionMutation} from "@/store/api/AlbumApi";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import {handleAddPlaylist, handleRemovePlaylist} from "@/util/handlePlaylistControl";
import {handleAddAlbum, handleRemoveAlbum} from "@/util/handleAlbumControl";
import {albumImagePath, playlistImagePath} from "@/util/ImagePath";

interface Items {
    type: string
    collection: playlistDto | albumDto
}

const CollectionHeader: React.FC<Items> = ({type, collection}) => {

    const {data: user, isLoading} = useFetchProfileQuery()
    const [addPlaylist, {isLoading: playlistAddLoading}] = useAddPlaylistToUserCollectionMutation()
    const [removePlaylist, {isLoading: playlistRemoveLoading}] = useRemovePlaylistFromUserCollectionMutation()
    const [addAlbum, {isLoading: albumAddLoading}] = useAddAlbumToUserCollectionMutation()
    const [removeAlbum, {isLoading: albumRemoveLoading}] = useRemoveAlbumFromUserCollectionMutation()

    if (isLoading) {
        return
    }

    let descriptionLength = collection.description
    descriptionLength ? descriptionLength = useTextLength(collection.description, 240) : collection.description

    return (
        <div>
            <div className={styles.headerMain}>
                <div className={styles.headerContainer}>
                    <div className={styles.imageContainer}>
                        <Image
                            className={styles.image}
                            priority={true}
                            width={215}
                            height={215}
                            src={type === 'album' && 'artist' in collection ? albumImagePath(collection) : 'user' in collection && playlistImagePath(collection)}
                            alt={'collection_logo'}
                        />
                    </div>
                    <div className={styles.headerText}>
                        <div>
                            <h1 className={styles.textTitle}>{useTextLength(collection.name[1], 15)}</h1>
                            {type === 'album' && 'artist' in collection ?
                                <Link className={styles.userLink}
                                      href={user._id !== collection.artist._id ?
                                          `/pth/hub/users/${collection.artist._id}`
                                          :
                                          `/pth/hub/profile`
                                      }>
                                    {useTextLength(collection.name[0], 15)}
                                </Link>
                                :
                                null
                            }
                            {type === 'playlist' && 'user' in collection ?
                                <Link className={styles.userLink}
                                      href={user._id !== collection.user._id ?
                                          `/pth/hub/users/${collection.user._id}`
                                          :
                                          `/pth/hub/profile`
                                      }>
                                    {useTextLength(collection.name[0], 15)}
                                </Link>
                                :
                                null
                            }
                        </div>
                        <div className={styles.collectionInfo}>
                            <div className={styles.scoresItem}>
                                <p className={styles.scoresItemLeft}>Favorites</p>
                                <p className={styles.scoresItemRight}>{collection.favorites}</p>
                            </div>
                            {
                                collection.genre.length !== 0 ?
                                    <div className={styles.genresContainer}>
                                        <div className={styles.genresLinkContainer}>
                                            {collection.genre.map((genre) =>
                                                <Link
                                                    href={`/pth/hub/genre/${genre._id}`}
                                                    key={genre._id}
                                                    className={styles.genreLink}>
                                                    {genre.name}
                                                </Link>
                                            )}
                                        </div>
                                        <p className={styles.genreTitle}>:</p>
                                        <p className={styles.genreTitle}>GENRES</p>
                                    </div>

                                    :
                                    null
                            }
                            <div>
                                <>
                                    {
                                        type === 'playlist' && user.playlists.findIndex(t => t._id === collection._id) === -1 ?
                                            <div className={styles.actionContainer}>
                                                {
                                                    user.playlistsCollection.findIndex(t => t._id === collection._id) !== -1 ?
                                                        <>
                                                            {
                                                                playlistRemoveLoading ?
                                                                    <LoadingOutlined className={styles.loading}/>
                                                                    :
                                                                    <>
                                                                        <HeartFilled
                                                                            onClick={() => handleRemovePlaylist(removePlaylist, collection._id)}
                                                                            className={styles.favActionFill}/>
                                                                        <p>IN YOUR COLLECTION</p>
                                                                    </>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {
                                                                playlistAddLoading ?
                                                                    <LoadingOutlined className={styles.loading}/>
                                                                    :
                                                                    <>
                                                                        <HeartOutlined
                                                                            onClick={() => handleAddPlaylist(addPlaylist, collection._id)}
                                                                            className={styles.favActionEmpty}/>
                                                                        <p>ADD TO YOUR COLLECTION</p>
                                                                    </>
                                                            }
                                                        </>
                                                }
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        type === 'album' && user.albums.findIndex(t => t._id === collection._id) === -1 ?
                                            <div className={styles.actionContainer}>
                                                {
                                                    user.albumsCollection.findIndex(t => t._id === collection._id) !== -1 ?
                                                        <>
                                                            {
                                                                albumRemoveLoading ?
                                                                    <LoadingOutlined className={styles.loading}/>
                                                                    :
                                                                    <>
                                                                        <HeartFilled
                                                                            onClick={() => handleRemoveAlbum(removeAlbum, collection._id)}
                                                                            className={styles.favActionFill}/>
                                                                        <p>IN YOUR COLLECTION</p>
                                                                    </>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {
                                                                albumAddLoading ?
                                                                    <LoadingOutlined className={styles.loading}/>
                                                                    :
                                                                    <>
                                                                        <HeartOutlined
                                                                            onClick={() => handleAddAlbum(addAlbum, collection._id)}
                                                                            className={styles.favActionEmpty}/>
                                                                        <p>ADD TO YOUR COLLECTION</p>
                                                                    </>
                                                            }
                                                        </>
                                                }
                                            </div>
                                            :
                                            null
                                    }
                                </>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    {
                        collection.description && collection.description.length > 240 ?
                            <>
                                <Popover overlayStyle={{width: 600}} content={collection.description}>
                                    <InfoCircleOutlined/>
                                </Popover>
                                <p>DESCRIPTION: {descriptionLength}</p>
                            </>
                            :
                            null
                    }
                    {
                        collection.description && collection.description.length < 240 ?
                            <p>DESCRIPTION: {collection.description}</p>
                            :
                            null
                    }
                </div>
            </div>
            <div className={styles.trackList}>
                <TrackList tracks={collection.tracks}/>
            </div>
        </div>
    );
};

export default CollectionHeader;