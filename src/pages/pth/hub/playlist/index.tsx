import React from 'react';
import PlaylistCollection from "@/components/Content/PlaylistPage/PlaylistCollection";

import {playlists} from "@/api/dto/tracks.entity"

const Index = () => {

    return (
        <div>
            <PlaylistCollection playlists={playlists}/>
        </div>
    );
};

export default Index;