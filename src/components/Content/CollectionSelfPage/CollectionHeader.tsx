import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {notification, Popover} from "antd";
import {HeartFilled, HeartOutlined, InfoCircleOutlined, LoadingOutlined} from "@ant-design/icons";

import styles from './styles/CollectionHeader.module.css'
import TrackList from "@/components/Content/TrackPage/TrackList";
import useTextLength from "@/util/useTextLength";
import {userDto} from "@/api/dto/user.dto";
import {genreDto} from "@/api/dto/genre.dto";
import {trackDto} from "@/api/dto/track.dto";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {
    useAddPlaylistToUserCollectionMutation,
    useRemovePlaylistFromUserCollectionMutation
} from "@/store/api/PlaylistApi";
import {useAddAlbumToUserCollectionMutation, useRemoveAlbumFromUserCollectionMutation} from "@/store/api/AlbumApi";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

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

    const handleAddPlaylist = () => {
        try {
            addPlaylist(collection._id)

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Done!</p>,
                description: <p className={styles.notification}>Playlist added successfully</p>,
                placement: "bottomLeft",
                duration: 2
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleAddAlbum = () => {
        try {
            addAlbum(collection._id)

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Done!</p>,
                description: <p className={styles.notification}>Album added successfully</p>,
                placement: "bottomLeft",
                duration: 2
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleRemovePlaylist = () => {
        try {
            removePlaylist(collection._id)

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Done!</p>,
                description: <p className={styles.notification}>Playlist removed successfully</p>,
                placement: "bottomLeft",
                duration: 2
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleRemoveAlbum = () => {
        try {
            removeAlbum(collection._id)

            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Done!</p>,
                description: <p className={styles.notification}>Playlist removed successfully</p>,
                placement: "bottomLeft",
                duration: 2
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className={styles.headerMain}>
                <div className={styles.headerContainer}>
                    <Image
                        className={styles.image}
                        priority={true}
                        quality={100}
                        width={250}
                        height={250}
                        src={`http://localhost:4221/${type}/${collection.name[0]}/${collection.image}`}
                        alt={'collection_logo'}
                    />
                    <div className={styles.headerText}>
                        <div>
                            <h1 className={styles.textTitle}>{collection.name[1]}</h1>
                            <Link className={styles.userLink}
                                  href={type === 'album' ?
                                      `/pth/hub/profile/${collection.artist._id}`
                                          :
                                      `/pth/hub/profile/${collection.user._id}`
                                  }>{collection.name[0]}</Link>
                        </div>
                        <div className={styles.collectionInfo}>
                            <div className={styles.scoresItem}>
                                <p className={styles.scoresItemLeft}>Favorites</p>
                                <p className={styles.scoresItemRight}>{collection.favorites}</p>
                            </div>
                            {
                                collection.genre.length !== 0 ?
                                    <p className={styles.genre}>
                                        {collection.genre.map((genre) =>
                                            <Link
                                                href={`/pth/hub/genre/${genre._id}`}
                                                key={genre._id}
                                                className={styles.link}>
                                                {genre.name}
                                            </Link>
                                        )}
                                        : GENRES
                                    </p>
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
                                                                        <HeartFilled onClick={handleRemovePlaylist}
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
                                                                        <HeartOutlined onClick={handleAddPlaylist}
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
                                                                        <HeartFilled onClick={handleRemoveAlbum}
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
                                                                        <HeartOutlined onClick={handleAddAlbum}
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