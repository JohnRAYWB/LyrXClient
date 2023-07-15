import React from 'react';
import AlbumCollection from "@/components/Content/CollectionPage/AlbumCollection";

import {albums} from "@/api/dto/tracks.entity"
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const Index: NextPageWithLayout = () => {

    return (
        <AlbumCollection albums={albums}/>
    );
};

Index.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Albums'}>{page}</MainLayout>
}
export default Index;