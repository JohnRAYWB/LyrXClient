import React from 'react';
import {NextPage} from "next";
import CollectionHeader from "@/components/Content/CollectionSelfPage/CollectionHeader";
import TrackList from "@/components/Content/TrackPage/TrackList";

import {playlist} from "@/api/dto/tracks.entity";

const PlaylistPage: NextPage = () => {

    const {image, name, description, favorites, tracks, genre} = playlist

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
}
    ;

    PlaylistPage.displayName = 'Playlist Page'
    export default PlaylistPage;