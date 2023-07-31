import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import EditEntitiesList from "@/components/Content/ToolsPage/components/EditEntities/EditEntitiesList";
import {useFetchAllAlbumAndSearchQuery} from "@/store/api/AlbumApi";

const Delete: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: albums, isLoading, refetch} = useFetchAllAlbumAndSearchQuery(query)

    if(isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Delete Album'} searchElement={<Search onChange={searchHandle}/>}>
            <EditEntitiesList
                entities={albums}
                refetch={refetch}
                entitiesType={'album'}
                type={'delete'}
            />
        </MainLayout>
    );
};

export default Delete;