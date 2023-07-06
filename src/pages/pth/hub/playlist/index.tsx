import React from 'react';
import PlaylistCollection from "@/components/Content/CollectionPage/PlaylistCollection";

import {playlists} from "@/api/dto/tracks.entity"
import {NextPage} from "next";

const Index: NextPage = () => {

    return (
        <PlaylistCollection playlists={playlists}/>
    );
};

Index.displayName = 'Playlists'
export default Index;