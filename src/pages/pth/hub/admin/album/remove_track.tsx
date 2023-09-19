import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import Search from "@/components/screens/MainLayout/Sider/components/Search";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import EditEntitiesList from "@/components/Content/ToolsPage/components/EditEntities/EditEntitiesList";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useFetchAllAlbumAndSearchQuery} from "@/store/api/AlbumApi";
import {useFetchProfileQuery} from "@/store/api/UserApi";

const RemoveTrack: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: user, isLoading: userLoading} = useFetchProfileQuery()
    const {data: albums, isLoading, refetch} = useFetchAllAlbumAndSearchQuery(query)

    if (isLoading || userLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Remove Track From Album'} searchElement={<Search onChange={searchHandle}/>}>
            {user.roles.findIndex(role => role.role === 'admin') === -1 ?
                <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
                :
                albums.length !== 0 ?
                    <EditEntitiesList
                        entities={albums}
                        entitiesType={'album'}
                        type={'remove'}
                        refetch={refetch}
                    />
                    :
                    <p style={{textAlign: "center", fontSize: 36, textTransform: 'uppercase', color: '#888888'}}>
                        Albums not found
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

export default RemoveTrack;