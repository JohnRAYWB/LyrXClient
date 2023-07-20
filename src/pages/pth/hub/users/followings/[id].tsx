import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import {useFetchUserByIdQuery} from "@/store/api/UserApi";
import UserList from "@/components/Content/UserPage/UserList";
import Search from "@/components/screens/MainLayout/Sider/components/Search";

interface UserParam {
    userId: string
}

const Followings: NextPageWithLayout<UserParam> = ({userId}) => {

    const [query, setQuery] = useState('')
    const {data: user, isLoading} = useFetchUserByIdQuery(userId)

    if (isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }
    return (
        <MainLayout name={'Followings'} searchElement={<Search onChange={searchHandle}/>}>
            <UserList users={user.followings.filter(f => f.username.toLowerCase().includes(query.toLowerCase()))}
                      type={'followings'}/>
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

        return {
            props: {
                userId: ctx.params.id
            }
        }
    } catch (e) {
        console.log(e)
    }
})

export default Followings