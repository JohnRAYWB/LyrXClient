import React from 'react';

import styles from "../styles/PickedGenresList.module.css"
import {trackDto} from "@/api/dto/track.dto";
import {useFetchAllGenreQuery} from "@/store/api/GenreApi";
import {useAddGenreToTrackMutation, useRemoveGenreFromTrackMutation} from "@/store/api/TrackApi";
import {LoadingOutlined} from "@ant-design/icons";

interface Param {
    track: trackDto
}

const EditGenre: React.FC<Param> = ({track}) => {

    const {data: genres, isLoading: genresLoading} = useFetchAllGenreQuery()
    const [addGenre, {isLoading: addGenreLoading}] = useAddGenreToTrackMutation()
    const [removeGenre, {isLoading: removeGenreLoading}] = useRemoveGenreFromTrackMutation()

    if (genresLoading) {
        return <></>
    }

    const handleGenreControl = (gId) => {
        if (trackGenres.findIndex(tGenre => tGenre._id === gId) === -1) addGenre({tId: track._id, genre: gId})
        if (trackGenres.findIndex(tGenre => tGenre._id === gId) !== -1) removeGenre({tId: track._id, genre: gId})
    }

    const {genre: trackGenres} = track

    return (
        <div className={styles.genresContainer}>
            <div className={styles.genresList}>
                {genres.map(genre =>
                    <p
                        key={genre._id}
                        className={trackGenres.find(gId => gId._id === genre._id) ? styles.addedGenre : styles.genre}
                        onClick={() => handleGenreControl(genre._id)}
                    >
                        {genre.name}
                    </p>
                )}
                {
                    addGenreLoading || removeGenreLoading ?
                        <LoadingOutlined className={styles.loadingSpinner}/>
                        :
                        null
                }
            </div>
        </div>
    );
};

export default EditGenre;