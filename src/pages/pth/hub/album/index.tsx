import React from 'react';
import AlbumCollection from "@/components/Content/CollectionPage/AlbumCollection";

import {albums} from "@/api/dto/tracks.entity"
import {NextPage} from "next";

const Index: NextPage = () => {

    return (
        <AlbumCollection albums={albums}/>
    );
};

Index.displayName = 'Albums'
export default Index;