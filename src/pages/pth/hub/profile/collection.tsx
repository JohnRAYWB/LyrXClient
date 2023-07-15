import React from 'react';
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const Collection: NextPageWithLayout = () => {
    return (
        <div>
            collection
        </div>
    );
};

Collection.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Collection'}>{page}</MainLayout>
}
export default Collection;