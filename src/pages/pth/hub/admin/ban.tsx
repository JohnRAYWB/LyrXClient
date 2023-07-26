import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {useFetchAllUserAndSearchQuery} from "@/store/api/UserApi";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import UserList from "@/components/Content/UserPage/UserList";

const Ban: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')
    const {data: users, isLoading} = useFetchAllUserAndSearchQuery(query)

    if (isLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Ban control'} searchElement={<Search onChange={searchHandle}/>}>
            <UserList users={users} type={'ban'}/>
        </MainLayout>
    );
};

export default Ban;