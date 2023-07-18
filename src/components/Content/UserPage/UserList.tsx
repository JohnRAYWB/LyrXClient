import React from 'react';

import styles from "./styles/UserList.module.css"
import User from "@/components/Content/UserPage/User";
import {userDto} from "@/api/dto/user.dto";
import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";

interface Users {
    users: userDto[]
    type: string
}

const UserList: React.FC<Users> = ({users, type}) => {

    const loggedUser = useAppSelector(selectUserData)

    if(users.length === 0) {
        return <p className={styles.notFound}>User not found!</p>
    }

    if(type === 'users') {
        const userList = users.filter(user => user._id !== loggedUser._id)

        return (
            <div className={styles.container}>
                {userList && userList.map(user =>
                    <User
                        key={user._id}
                        user={user}
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
                />
            )}
        </div>
    );
};

export default UserList