import React from 'react';
import {genreDto} from "@/api/dto/genre.dto";
import Genre from "@/components/Content/GenrePage/Genre";
import styles from "./styles/GenreList.module.css"

interface GenreList {
    genres: genreDto[]
}

const GenreList: React.FC<GenreList> = ({genres}) => {
    return (
        <div className={styles.main}>
            {genres.map(genre =>
            <Genre
                key={genre._id}
                genre={genre}/>
            )}
        </div>
    );
};

export default GenreList;