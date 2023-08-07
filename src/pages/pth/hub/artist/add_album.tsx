import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import AddAlbumTool from "@/components/Content/ArtistTools/AddAlbumTool";

const AddAlbum: NextPageWithLayout = () => {

    const {data: user, isLoading} = useFetchProfileQuery()

    if(isLoading) {
        return <></>
    }

    if(user.roles.findIndex(role => role.role === 'artist') === -1) {
        return <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
    }

    return <AddAlbumTool/>
};

AddAlbum.getLayout = (page: React.ReactNode) => <MainLayout name={'Add Album'}>{page}</MainLayout>

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

export default AddAlbum;