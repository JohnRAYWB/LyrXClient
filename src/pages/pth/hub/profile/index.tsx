import React from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";
import ProfilePage from "@/components/Content/ProfilePage/ProfilePage";

const Profile: NextPageWithLayout = () => {

    const user = useAppSelector(selectUserData)

    if(!user) {
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