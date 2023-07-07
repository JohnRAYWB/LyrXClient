import React from 'react';
import {NextPage} from "next";
import CollectionHeader from "@/components/Content/CollectionSelfPage/CollectionHeader";
import TrackList from "@/components/Content/TrackPage/TrackList";

import {album} from "@/api/dto/tracks.entity";

const AlbumPage: NextPage = () => {

    const {image, name, description, favorites, tracks, genre} = album

    return (
        <div>
            <CollectionHeader
                image={image}
                name={name}
                description={description}
                favorites={favorites}
                tracks={tracks}
                genre={genre}
            />
        </div>
    );
};

AlbumPage.displayName = 'Album Page'
export default AlbumPage;