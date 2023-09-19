import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import EditEntitiesList from "@/components/Content/ToolsPage/components/EditEntities/EditEntitiesList"
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useFetchAllTrackAndSearchQuery} from "@/store/api/TrackApi";
import {useFetchProfileQuery} from "@/store/api/UserApi";

const Delete: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: user, isLoading: userLoading} = useFetchProfileQuery()
    const {data: tracks, isLoading, refetch} = useFetchAllTrackAndSearchQuery(query)

    if (isLoading || userLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Delete Track'} searchElement={<Search onChange={searchHandle}/>}>
            {user.roles.findIndex(role => role.role === 'admin') === -1 ?
                <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
                :
                tracks.length !== 0 ?
                    <EditEntitiesList
                        entities={tracks}
                        refetch={refetch}
                        entitiesType={'track'}
                        type={'delete'}
                    />
                    :
                    <p style={{textAlign: "center", fontSize: 36, textTransform: 'uppercase', color: '#888888'}}>
                        Tracks not found
                    </p>
            }
        </MainLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if (!access_token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default Delete;