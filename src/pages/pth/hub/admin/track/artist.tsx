import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import EditEntitiesList from "@/components/Content/ToolsPage/components/EditEntities/EditEntitiesList";
import {useFetchAllTrackAndSearchQuery} from "@/store/api/TrackApi";

const Artist: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: tracks, isLoading, refetch} = useFetchAllTrackAndSearchQuery(query)

    if (isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Edit Artist'} searchElement={<Search onChange={searchHandle}/>}>
            <EditEntitiesList
                entities={tracks}
                refetch={refetch}
                entitiesType={'track'}
                type={'edit'}
            />
        </MainLayout>
    );
};

export default Artist;