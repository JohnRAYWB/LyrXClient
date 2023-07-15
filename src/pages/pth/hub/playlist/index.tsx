import React from 'react';
import PlaylistCollection from "@/components/Content/CollectionPage/PlaylistCollection";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const Index: NextPageWithLayout = () => {

    return (
        <PlaylistCollection/>
    );
};

Index.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Playlists'}>{page}</MainLayout>
}
export default Index;