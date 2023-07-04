import React from 'react';
import AlbumCollection from "@/components/Content/CollectionPage/AlbumCollection";

import {albums} from "@/api/dto/tracks.entity"

const Index = () => {

    return (
        <AlbumCollection albums={albums}/>
    );
};

export default Index;