import React from 'react';
import AlbumCollection from "@/components/Content/CollectionPage/AlbumCollection";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const Album: NextPageWithLayout = () => {

    return (
        <AlbumCollection/>
    );
};

Album.getLayout = (page: React.ReactNode) => <MainLayout name={'Albums'}>{page}</MainLayout>

export default Album;