import React from 'react';

import styles from "../styles/PickedGenresList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {useFetchAllGenreQuery} from "@/store/api/GenreApi";
import {useAddGenreToTrackMutation, useRemoveGenreFromTrackMutation} from "@/store/api/TrackApi";
import {LoadingOutlined} from "@ant-design/icons";
import {albumDto} from "@/api/dto/album.dto";
import {useAddGenreToAlbumMutation, useRemoveGenreFromAlbumMutation} from "@/store/api/AlbumApi";
import {playlistDto} from "@/api/dto/playlist.dto";
import {useAddGenreToPlaylistMutation, useRemoveGenreFromPlaylistMutation} from "@/store/api/PlaylistApi";

interface Param {
    type: string
    entity: trackDto | albumDto | playlistDto
}

const EditGenre: React.FC<Param> = ({type, entity}) => {

    const {data: genres, isLoading: genresLoading} = useFetchAllGenreQuery()

    const [addGenreToTrack, {isLoading: addGenreToTrackLoading}] = useAddGenreToTrackMutation()
    const [removeGenreFromTrack, {isLoading: removeGenreFromTrackLoading}] = useRemoveGenreFromTrackMutation()

    const [addGenreToAlbum, {isLoading: addGenreToAlbumLoading}] = useAddGenreToAlbumMutation()
    const [removeGenreFromAlbum, {isLoading: removeGenreFromTAlbumLoading}] = useRemoveGenreFromAlbumMutation()

    const [addGenreToPlaylist, {isLoading: addGenreToPlaylistLoading}] = useAddGenreToPlaylistMutation()
    const [removeGenreFromPlaylist, {isLoading: removeGenreFromPlaylistLoading}] = useRemoveGenreFromPlaylistMutation()

    if (genresLoading) {
        return <></>
    }

    const {genre: entityGenres} = entity

    const handleGenreControl = (gId) => {
        if (type === 'track') {
            if (entityGenres.findIndex(tGenre => tGenre._id === gId) === -1) addGenreToTrack({
                tId: entity._id,
                genre: gId
            })
            if (entityGenres.findIndex(tGenre => tGenre._id === gId) !== -1) removeGenreFromTrack({
                tId: entity._id,
                genre: gId
            })
        }

        if (type === 'album') {
            if (entityGenres.findIndex(aGenre => aGenre._id === gId) === -1) addGenreToAlbum({
                aId: entity._id,
                genre: gId
            })
            if (entityGenres.findIndex(aGenre => aGenre._id === gId) !== -1) removeGenreFromAlbum({
                aId: entity._id,
                genre: gId
            })
        }

        if (type === 'playlist') {
            if (entityGenres.findIndex(pGenre => pGenre._id === gId) === -1) addGenreToPlaylist({
                pId: entity._id,
                genre: gId
            })
            if (entityGenres.findIndex(pGenre => pGenre._id === gId) !== -1) removeGenreFromPlaylist({
                pId: entity._id,
                genre: gId
            })
        }
    }

    return (
        <div className={styles.genresContainer}>
            <div className={styles.genresList}>
                {genres.map(genre =>
                    <p
                        key={genre._id}
                        className={entityGenres.find(gId => gId._id === genre._id) ? styles.addedGenre : styles.genre}
                        onClick={() => handleGenreControl(genre._id)}
                    >
                        {genre.name}
                    </p>
                )}
                {
                    addGenreToTrackLoading || removeGenreFromTrackLoading || addGenreToAlbumLoading || removeGenreFromTAlbumLoading || addGenreToPlaylistLoading || removeGenreFromPlaylistLoading ?
                        <LoadingOutlined className={styles.loadingSpinner}/>
                        :
                        null
                }
            </div>
        </div>
    );
};

export default EditGenre;