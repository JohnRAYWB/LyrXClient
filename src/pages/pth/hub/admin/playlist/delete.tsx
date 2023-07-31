import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import EditEntitiesList from "@/components/Content/ToolsPage/components/EditEntities/EditEntitiesList";
import {useFetchAllPlaylistAndSearchQuery} from "@/store/api/PlaylistApi";


const Delete: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: playlists, isLoading, refetch} = useFetchAllPlaylistAndSearchQuery(query)

    if(isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Delete Playlist'} searchElement={<Search onChange={searchHandle}/>}>
            <EditEntitiesList
                entities={playlists}
                refetch={refetch}
                entitiesType={'playlist'}
                type={'delete'}
            />
        </MainLayout>
    );
};

export default Delete;