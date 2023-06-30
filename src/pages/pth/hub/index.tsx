import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import {checkAuth} from "@/hook/checkAuth";
import styles from "@/styles/Hub.module.css"
import TrackRow from "@/components/Content/HubPage/TrackRow";


const Hub: NextPage = () => {

    return (
        <div className={styles.main}>
            <title>Hub | LyrX</title>
            <TrackRow/>
            <TrackRow/>
            <TrackRow/>
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