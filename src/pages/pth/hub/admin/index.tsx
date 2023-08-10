import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import AdminTools from "@/components/Content/ToolsPage/AdminTools";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useFetchProfileQuery} from "@/store/api/UserApi";

const Admin: NextPageWithLayout = () => {

    const {data: user, isLoading: userLoading} = useFetchProfileQuery()

    if(userLoading) {
        return <></>
    }

    if(user.roles.findIndex(role => role.role === 'admin') === -1) {
        return <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
    }

    return <AdminTools/>
};

Admin.getLayout = (page: React.ReactNode) => <MainLayout name={'Admin Tools'}>{page}</MainLayout>

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

export default Admin;