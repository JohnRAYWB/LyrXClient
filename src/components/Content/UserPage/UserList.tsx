import React from 'react';

import styles from "./styles/UserList.module.css"
import User from "@/components/Content/UserPage/User";
import {userDto} from "@/api/dto/user.dto";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {LoadingOutlined} from "@ant-design/icons";

interface Users {
    users: userDto[]
    type: string
    searchFetching?: boolean
}

const UserList: React.FC<Users> = ({users, type, searchFetching}) => {

    if(searchFetching) {
        return <div className={styles.searchContainer}>
            <p className={styles.searchText}>Search user</p>
            <LoadingOutlined className={styles.searchText}/>
        </div>
    }

    const {data: loggedUser, isLoading} = useFetchProfileQuery()

    if(isLoading) {
        return <></>
    }

    if(users.length === 0) {
        return <p className={styles.notFound}>User not found!</p>
    }

    if(type === 'users' || type === 'ban' || type === 'role') {
        const userList = users.filter(user => user._id !== loggedUser._id)

        return (
            <div className={styles.container}>
                {userList && userList.map(user =>
                    <User
                        key={user._id}
                        user={user}
                        type={type}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {users && users.map(user =>
                <User
                    key={user._id}
                    user={user}
                    type={type}
                />
            )}
        </div>
    );
};

export default UserList