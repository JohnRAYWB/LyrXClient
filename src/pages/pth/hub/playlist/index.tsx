import React from 'react';
import PlaylistCollection from "@/components/Content/CollectionPage/PlaylistCollection";

import {playlists} from "@/api/dto/tracks.entity"

const Index = () => {

    return (
        <PlaylistCollection playlists={playlists}/>
    );
};

export default Index;