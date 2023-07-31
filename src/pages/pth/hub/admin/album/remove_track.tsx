import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import Search from "@/components/screens/MainLayout/Sider/components/Search";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {useFetchAllAlbumAndSearchQuery} from "@/store/api/AlbumApi";
import EditEntitiesList from "@/components/Content/ToolsPage/components/EditEntities/EditEntitiesList";

const RemoveTrack: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: albums, isLoading, refetch} = useFetchAllAlbumAndSearchQuery(query)

    if (isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Remove Track From Album'} searchElement={<Search onChange={searchHandle}/>}>
            <EditEntitiesList entities={albums} entitiesType={'album'} type={'remove'} refetch={refetch}/>
        </MainLayout>
    );
};

export default RemoveTrack;