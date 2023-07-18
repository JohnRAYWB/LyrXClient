import React from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

import styles from "@/styles/Hub.module.css"
import TrackRow from "@/components/Content/HubPage/TrackRow";
import PlaylistRow from "@/components/Content/HubPage/PlaylistRow";
import AlbumRow from "@/components/Content/HubPage/AlbumRow";
import Search from "@/components/screens/MainLayout/Sider/components/Search";

const Hub: NextPageWithLayout = () => {

    return (
            <div className={styles.main}>
                <TrackRow/>
                <PlaylistRow/>
                <AlbumRow/>
            </div>
    );
};

Hub.getLayout = (page: React.ReactNode) => <MainLayout searchElement={Search} name={'Hub'}>{page}</MainLayout>

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

export default Hub;