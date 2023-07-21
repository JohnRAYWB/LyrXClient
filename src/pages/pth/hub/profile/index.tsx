import React from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {LoadingOutlined} from "@ant-design/icons";

import styles from "@/components/Content/ProfilePage/styles/ProfilePage.module.css"
import ProfilePage from "@/components/Content/ProfilePage/ProfilePage";
import {useFetchProfileQuery} from "@/store/api/UserApi";

const Profile: NextPageWithLayout = () => {

    const {data: user, isFetching} = useFetchProfileQuery()

    if(isFetching) {
        return <div className={styles.fetchingWarn}>
            <p>Uploading data... Wait a moment</p>
            <LoadingOutlined/>
        </div>
    }

    return <ProfilePage user={user} type={'profile'}/>
};

Profile.getLayout = (page: React.ReactNode) => <MainLayout name={'Profile'}>{page}</MainLayout>

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

export default Profile