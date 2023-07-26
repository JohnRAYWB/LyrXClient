import React from 'react';
import Image from "next/image";
import {TeamOutlined, UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

import styles from "./styles/User.module.css"
import {userDto} from "@/api/dto/user.dto";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import UserComponent from "@/components/Content/UserPage/components/UserComponent";

interface UserParam {
    user: userDto
    type?: string
}

const User: React.FC<UserParam> = ({user, type}) => {

    if(type === 'ban') {
        return <UserComponent key={user._id} user={user} type={'ban'}/>
    }

    return <UserComponent user={user}/>
};

export default User;