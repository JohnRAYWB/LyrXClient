import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import AlbumCollection from "@/components/Content/CollectionPage/AlbumCollection";
import {useFetchAllAndSearchQuery} from "@/store/api/AlbumApi";
import Search from "@/components/screens/MainLayout/Sider/components/Search";

const Album: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: albums, isLoading} = useFetchAllAndSearchQuery(query)

    if (isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }
    return (
        <MainLayout name={'Albums'} searchElement={<Search onChange={searchHandle}/>}>
            <AlbumCollection albums={albums}/>
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

export default Album;