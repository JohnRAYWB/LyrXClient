import React from 'react';
import PlaylistCollection from "@/components/Content/CollectionPage/PlaylistCollection";
import {NextPage} from "next";

const Index: NextPage = () => {

    return (
        <PlaylistCollection/>
    );
};

Index.displayName = 'Playlists'
export default Index;