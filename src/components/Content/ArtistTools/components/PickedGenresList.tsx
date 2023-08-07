import React from 'react';

import styles from "../styles/PickedGenresList.module.css"
import {useFetchAllGenreQuery} from "@/store/api/GenreApi";

interface Param {
    pickedGenres: any[]
    setPickedGenres: Function
}

const PickedGenresList: React.FC<Param> = ({pickedGenres, setPickedGenres}) => {

    const {data: genres, isLoading} = useFetchAllGenreQuery()

    if(isLoading) {
        return <></>
    }

    const handlePickGenre = (gId) => {

        if(pickedGenres.findIndex(genre => genre === gId) === -1) {
            setPickedGenres(prevGenres => [...prevGenres, gId])
        }

        if(pickedGenres.findIndex(genre => genre === gId) !== -1) {
            setPickedGenres(prevGenres => prevGenres.filter(genre => genre !== gId))
        }

        return pickedGenres
    }

    return (
        <div className={styles.genresContainer}>
            <div className={styles.genresList}>
                {genres.map(genre =>
                    <p
                        key={genre._id}
                        onClick={() => handlePickGenre(genre._id)}
                        className={pickedGenres.includes(genre._id) ? styles.addedGenre : styles.genre}
                    >
                        {genre.name}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PickedGenresList;