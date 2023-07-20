import React from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import {useFetchUserByIdQuery} from "@/store/api/UserApi";
import ProfilePage from "@/components/Content/ProfilePage/ProfilePage";

interface UserParam {
    userId: string
}

const UserPage: NextPageWithLayout<UserParam> = ({userId}) => {

    const {data: user, isLoading} = useFetchUserByIdQuery(userId)

    if(isLoading) {
        return <></>
    }

    return <ProfilePage user={user} type={'user'}/>
};

UserPage.getLayout = (page: React.ReactNode) => <MainLayout name={'User Profile'}>{page}</MainLayout>

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

        return {
            props: {
                userId: ctx.params.id
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default UserPage