import React from 'react';
import Image from "next/image";
import {TeamOutlined, UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

import styles from "./styles/User.module.css"
import {userDto} from "@/api/dto/user.dto";
import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";

interface UserParam {
    user: userDto
}

const User: React.FC<UserParam> = ({user}) => {

    const router = useRouter()
    const loggedUser = useAppSelector(selectUserData)

    return (
        <div className={styles.container}>
            {user.avatar ?
                <Image
                    className={styles.avatar}
                    priority={true}
                    width={125}
                    height={125}
                    src={`http:localhost:4221/profile/${user.username}/${user.avatar}`}
                    alt={'user_avatar'}
                />
                :
                <UserOutlined className={styles.emptyAvatar}/>
            }
            <div className={styles.textInfo}>
                {
                    user._id === loggedUser._id ?
                        <p className={styles.textUsername} onClick={() => router.push(`/pth/hub/profile`)}>{user.username}</p>
                        :
                        <p className={styles.textUsername} onClick={() => router.push(`/pth/hub/users/${user._id}`)}>{user.username}</p>
                }
                {
                    user._id === loggedUser._id ?
                        <p className={styles.textEmail} onClick={() => router.push(`/pth/hub/profile`)}>{user.email}</p>
                        :
                        <p className={styles.textEmail} onClick={() => router.push(`/pth/hub/users/${user._id}`)}>{user.email}</p>
                }
            </div>
            <div className={styles.subContainer}>
                <div className={styles.subLine}>
                    <TeamOutlined className={styles.subIcon}/>
                    <div className={styles.subRow}>
                        <h1 className={styles.subNum}>{user.followers.length}</h1>
                        <p className={styles.subText}>Followers</p>
                    </div>
                    <div className={styles.subRow}>
                        <h1 className={styles.subNum}>{user.followings.length}</h1>
                        <p className={styles.subText}>Followings</p>
                    </div>
                </div>
            </div>
            <div className={styles.roleContainer}>
                {user.roles.map(role =>
                <p className={styles.role} key={role._id}>
                    {role.role}
                </p>
                )}
            </div>
        </div>
    );
};

export default User;