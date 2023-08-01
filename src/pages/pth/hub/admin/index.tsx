import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import AdminToolPage from "@/components/Content/ToolsPage/AdminToolPage";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";

const Admin: NextPageWithLayout = () => {

    const user = useAppSelector(selectUserData)

    if(user.roles.findIndex(role => role.role === 'admin') === -1) {
        return <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
    }

    return <AdminToolPage/>
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