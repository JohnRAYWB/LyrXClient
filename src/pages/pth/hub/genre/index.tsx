import React from 'react';
import GenreList from "@/components/Content/GenrePage/GenreList";

import {genres} from "@/api/dto/genre.entity";

const Index = () => {
    return (
        <div>
            <h1>Billions of tracks for any genre</h1>
            <GenreList genres={genres}/>
        </div>
    );
};

export default Index;