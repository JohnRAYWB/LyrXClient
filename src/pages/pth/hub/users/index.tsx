import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import UserList from "@/components/Content/UserPage/UserList";
import {useFetchAllAndSearchQuery} from "@/store/api/UserApi";
import Search from "@/components/screens/MainLayout/Sider/components/Search";

const Users: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: users, isLoading} = useFetchAllAndSearchQuery(query)

    if (isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }
    return (
        <MainLayout name={'Users'} searchElement={<Search onChange={searchHandle}/>}>
            <UserList users={users} type={'users'}/>
        </MainLayout>
    )
};

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

export default Users;