import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import AddPlaylistTool from "@/components/Content/PlaylistTool/AddPlaylistTool";

const CreatePlaylist: NextPageWithLayout = () => {

    return <AddPlaylistTool/>
};

CreatePlaylist.getLayout = (page: React.ReactNode) => <MainLayout name={'Create Playlist'}>{page}</MainLayout>

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

export default CreatePlaylist;