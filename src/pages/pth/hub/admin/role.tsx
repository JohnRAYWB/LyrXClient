import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import UserList from "@/components/Content/UserPage/UserList";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useFetchAllUserAndSearchQuery, useFetchProfileQuery} from "@/store/api/UserApi";

const Role: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: user, isLoading: userLoading} = useFetchProfileQuery()
    const {data: users, isLoading: usersLoading} = useFetchAllUserAndSearchQuery(query)

    if (userLoading || usersLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Role Control'} searchElement={<Search onChange={searchHandle}/>}>
            {user.roles.findIndex(role => role.role === 'admin') === -1 ?
                <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
                :
                <UserList users={users} type={'role'}/>
            }
        </MainLayout>
    );
};

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

export default Role;