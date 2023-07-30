import React, {useState} from 'react';
import {useFetchAllTrackAndSearchQuery} from "@/store/api/TrackApi";
import {NextPageWithLayout} from "@/pages/_app";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import EditTracksList from "@/components/Content/TrackPage/EditTracksList";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

const Delete: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: tracks, isLoading, refetch} = useFetchAllTrackAndSearchQuery(query)

    if(isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Delete Track'} searchElement={<Search onChange={searchHandle}/>}>
            <EditTracksList tracks={tracks} type={'delete'} refetch={refetch}/>
        </MainLayout>
    );
};

export default Delete;