import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import {useFetchAllTrackAndSearchQuery} from "@/store/api/TrackApi";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import EditTracksList from "@/components/Content/TrackPage/EditTracksList";

const Artist: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: tracks, isLoading} = useFetchAllTrackAndSearchQuery(query)

    if(isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Edit Artist'} searchElement={<Search onChange={searchHandle}/>}>
            <EditTracksList tracks={tracks}/>
        </MainLayout>
    );
};

export default Artist;