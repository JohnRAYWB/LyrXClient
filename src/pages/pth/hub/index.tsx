import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import {checkAuth} from "@/hook/checkAuth";
import styles from "@/styles/Hub.module.css"
import TrackRow from "@/components/Content/HubPage/TrackRow";
import PlaylistRow from "@/components/Content/HubPage/PlaylistRow";
import AlbumRow from "@/components/Content/HubPage/AlbumRow";


const Hub: NextPage = () => {

    return (
        <div className={styles.main}>
            <TrackRow/>
            <PlaylistRow/>
            <AlbumRow/>
        </div>
    );
};


/*export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const authProps = await checkAuth(ctx)

    if('redirect' in authProps) {
        return authProps
    }

    return {
        props: {}
    }
}*/

export default Hub;