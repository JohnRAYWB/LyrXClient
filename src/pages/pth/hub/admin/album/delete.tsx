import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import EditEntitiesList from "@/components/Content/ToolsPage/components/EditEntities/EditEntitiesList";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";
import {useFetchAllAlbumAndSearchQuery} from "@/store/api/AlbumApi";

const Delete: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const user = useAppSelector(selectUserData)
    const {data: albums, isLoading, refetch} = useFetchAllAlbumAndSearchQuery(query)

    if(isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Delete Album'} searchElement={<Search onChange={searchHandle}/>}>
            {user.roles.findIndex(role => role.role === 'admin') === -1 ?
                <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
                :
                <EditEntitiesList
                    entities={albums}
                    refetch={refetch}
                    entitiesType={'album'}
                    type={'delete'}
                />
            }
        </MainLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if(!access_token) {
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