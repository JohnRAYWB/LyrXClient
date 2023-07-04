import React from 'react';
import {genreDto} from "@/api/dto/genre.dto";
import Genre from "@/components/Content/GenrePage/Genre";

interface GenreList {
    genres: genreDto[]
}

const GenreList: React.FC<GenreList> = ({genres}) => {
    return (
        <div>
            {genres.map(genre =>
            <Genre
                key={genre._id}
                genre={genre}/>
            )}
        </div>
    );
};

export default GenreList;