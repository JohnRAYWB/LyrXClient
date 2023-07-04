import React from 'react';
import {genreDto} from "@/api/dto/genre.dto";
import styles from "./styles/Genre.module.css"

interface Genre {
    genre: genreDto
}

const Genre: React.FC<Genre> = ({genre}) => {
    return (
        <div className={styles.main}>
            <p>{genre.name}</p>
        </div>
    );
};

export default Genre;