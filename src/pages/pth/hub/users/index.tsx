import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import UserList from "@/components/Content/UserPage/UserList";
import {useFetchAllUserAndSearchQuery, useFetchAllUsersQuery} from "@/store/api/UserApi";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import Pagination from "@/util/Pagination";

const Users: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)

    const {data: users, isLoading: usersLoading, isFetching: usersFetching} = useFetchAllUsersQuery(page)
    const {data: searchUsers, isLoading: searchLoading, isFetching: searchFetching} = useFetchAllUserAndSearchQuery(query)

    console.log(users)

    if (usersLoading || searchLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }
    return (
        <MainLayout name={'Users'} searchElement={<Search onChange={searchHandle}/>}>
            {
                query ?
                    <UserList users={searchUsers} type={'users'} searchFetching={searchFetching}/>
                    :
                    <Pagination page={page} setPage={setPage} isFetching={usersFetching} children={<UserList users={users} type={'users'}/>}/>
            }
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