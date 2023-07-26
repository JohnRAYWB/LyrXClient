import React, {useState} from 'react';
import Image from "next/image";
import {LoadingOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

import styles from "../styles/User.module.css"
import {userDto} from "@/api/dto/user.dto";
import {useBanUserMutation, useFetchProfileQuery, useUnbanUserMutation} from "@/store/api/UserApi";
import {ConfigProvider, Input, notification} from "antd";

interface UserParam {
    user: userDto
    type?: string
}

const User: React.FC<UserParam> = ({user, type}) => {

    const {data: loggedUser, isLoading} = useFetchProfileQuery()
    const [unbanUser, {isLoading: unbanLoading}] = useUnbanUserMutation()
    const [banUser, {isLoading: banLoading}] = useBanUserMutation()

    const [banReason, setBanReason] = useState('')
    const [openDetail, setOpenDetail] = useState(false)

    if (isLoading) {
        return <></>
    }

    const handleReason = (e) => {
        setBanReason(e.target.value)
    }

    const handleUnban = () => {
        unbanUser(user._id)
        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>User unban successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    const handleBan = () => {
        banUser({uId: user._id, reason: banReason})
        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>User ban successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    const router = useRouter()

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                {
                    user.avatar ?
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
                <div className={styles.textContainer}>
                    {
                        user._id === loggedUser._id ?
                            <div className={styles.textInfo}>
                                <p className={styles.textUsername}
                                   onClick={() => router.push(`/pth/hub/profile`)}>{user.username}</p>
                                <p className={styles.textEmail}
                                   onClick={() => router.push(`/pth/hub/profile`)}>{user.email}</p>
                            </div>
                            :
                            <div className={styles.textInfo}>
                                <p className={styles.textUsername}
                                   onClick={() => router.push(`/pth/hub/users/${user._id}`)}>{user.username}</p>
                                <p className={styles.textEmail}
                                   onClick={() => router.push(`/pth/hub/users/${user._id}`)}>{user.email}</p>
                            </div>
                    }
                </div>
                {
                    type !== 'ban' ?
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
                        :
                        null
                }
                <div className={styles.roleContainer}>
                    {
                        user.roles.map(role =>
                            <p className={styles.role} key={role._id}>
                                {role.role}
                            </p>
                        )}
                </div>
                {
                    type === 'ban' ?
                        <div className={styles.detailButtonContainer}>
                            <p onClick={() => setOpenDetail(!openDetail)} className={styles.detailButton}>Detailed
                                Info</p>
                        </div>
                        :
                        null
                }
            </div>
            {
                openDetail ?
                    <div>
                        <div className={styles.detailedInfoContainer}>
                            <div className={styles.detailedList}>
                                <p className={styles.detailedListTitle}>Comments</p>
                                {
                                    user.comments.length !== 0 ?
                                        <div>
                                            {user.comments.map(comment =>
                                                <p key={comment._id} className={styles.detailedListEntity}>
                                                    {comment.text}
                                                </p>
                                            )}
                                        </div>
                                        :
                                        <p className={styles.emptyListTitle}>User don't have comments</p>
                                }
                            </div>
                            <div className={styles.detailedList}>
                                <p className={styles.detailedListTitle}>Reasons</p>
                                {
                                    user.banReason.length !== 0 ?
                                        <div>
                                            {user.banReason.map((reason, index) =>
                                                <p key={index} className={styles.detailedListEntity}>{reason}</p>
                                            )}
                                        </div>
                                        :
                                        <p className={styles.emptyListTitle}>Reason list is empty</p>
                                }
                            </div>
                        </div>
                        <div>
                            {
                                !user.ban ?
                                    <>
                                        {banLoading ?
                                            <div className={styles.banContainer}>
                                                <LoadingOutlined className={styles.loadingBan}/>
                                            </div>
                                            :
                                            <div className={styles.banAction}>
                                                <p className={styles.detailedListTitle}>Ban reason</p>
                                                <ConfigProvider theme={{
                                                    token: {
                                                        colorBorder: '#232323FF',
                                                        colorTextPlaceholder: '#404040',
                                                        colorPrimary: '#ff2929',
                                                    }
                                                }}>
                                                    <Input className={styles.commentInput} onChange={handleReason}/>
                                                </ConfigProvider>
                                                <p onClick={handleBan} className={styles.banButton}>Ban</p>
                                            </div>
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            unbanLoading ?
                                                <div className={styles.banContainer}>
                                                    <LoadingOutlined className={styles.loadingUnban}/>
                                                </div>
                                                :
                                                <div className={styles.banContainer}>
                                                    <p onClick={handleUnban} className={styles.banButton}>Unban user</p>
                                                </div>
                                        }
                                    </>

                            }
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
};

export default User;