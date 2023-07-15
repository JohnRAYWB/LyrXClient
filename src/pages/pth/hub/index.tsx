import React from 'react';
import styles from "@/styles/Hub.module.css"
import TrackRow from "@/components/Content/HubPage/TrackRow";
import PlaylistRow from "@/components/Content/HubPage/PlaylistRow";
import AlbumRow from "@/components/Content/HubPage/AlbumRow";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import * as Api from "@/api"
import {selectUserData, setUserData} from "@/store/slice/user";
import {useAppSelector} from "@/hook/redux";
import {NextPageWithLayout} from "@/pages/_app";

const Hub: NextPageWithLayout = () => {

    const user = useAppSelector(selectUserData)

    return (
            <div className={styles.main}>
                hub
                {/*<TrackRow/>
                <PlaylistRow/>
                <AlbumRow/>*/}
            </div>
    );
};

Hub.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Hub'}>{page}</MainLayout>
}

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

        const userData = await Api.auth.getProfile(access_token)

        store.dispatch(setUserData(userData))
        return {
            props: {

            }
        }
    } catch (e) {
        console.log(e)
        return {props: {}}
    }
})

export default Hub;