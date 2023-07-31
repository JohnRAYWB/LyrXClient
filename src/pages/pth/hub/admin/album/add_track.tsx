import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import {useFetchAllAlbumAndSearchQuery} from "@/store/api/AlbumApi";

const AddTrack: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: albums, isLoading, refetch} = useFetchAllAlbumAndSearchQuery(query)

    if (isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Add Track To Album'} searchElement={<Search onChange={searchHandle}/>}>
            <div>

            </div>
        </MainLayout>
    );
};

export default AddTrack;