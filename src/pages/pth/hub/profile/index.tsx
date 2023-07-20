import React from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import ProfilePage from "@/components/Content/ProfilePage/ProfilePage";
import {useFetchProfileQuery} from "@/store/api/UserApi";

const Profile: NextPageWithLayout = () => {

    const {data: user, isLoading} = useFetchProfileQuery()

    if(isLoading) {
        return <></>
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