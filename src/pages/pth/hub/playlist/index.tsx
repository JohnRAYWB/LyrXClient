import React from 'react';
import PlaylistCollection from "@/components/Content/CollectionPage/PlaylistCollection";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const Playlist: NextPageWithLayout = () => {

    return (
        <PlaylistCollection/>
    );
};

Playlist.getLayout = (page: React.ReactNode) => <MainLayout name={'Playlists'}>{page}</MainLayout>

export default Playlist;