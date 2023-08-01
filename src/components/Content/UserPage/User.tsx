import React, {useState} from 'react';
import Image from "next/image";
import {TeamOutlined, UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

import styles from "./styles/User.module.css"
import {userDto} from "@/api/dto/user.dto";
import {
    useAddRoleMutation,
    useBanUserMutation,
    useFetchProfileQuery,
    useRemoveRoleMutation,
    useUnbanUserMutation
} from "@/store/api/UserApi";
import RoleHandler from "@/components/Content/UserPage/components/RoleHandler";
import UsersDetail from "@/components/Content/UserPage/components/UsersDetail";
import BanHandler from "@/components/Content/UserPage/components/BanHandler";

interface UserParam {
    user: userDto
    type?: string
}

const User: React.FC<UserParam> = ({user, type}) => {

    const {data: loggedUser, isLoading} = useFetchProfileQuery()

    const [addAdmin, {isLoading: addAdminLoading}] = useAddRoleMutation()
    const [addTester, {isLoading: addTesterLoading}] = useAddRoleMutation()
    const [addArtist, {isLoading: addArtistLoading}] = useAddRoleMutation()
    const [removeAdmin, {isLoading: removeAdminLoading}] = useRemoveRoleMutation()
    const [removeTester, {isLoading: removeTesterLoading}] = useRemoveRoleMutation()
    const [removeArtist, {isLoading: removeArtistLoading}] = useRemoveRoleMutation()

    const [unbanUser, {isLoading: unbanLoading}] = useUnbanUserMutation()
    const [banUser, {isLoading: banLoading}] = useBanUserMutation()

    const [banReason, setBanReason] = useState('')
    const [openDetail, setOpenDetail] = useState(false)

    if (isLoading) {
        return <></>
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
                    type !== 'ban' && type !== 'role' ?
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
                    type === 'ban' || type === 'role' ?
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
                        <UsersDetail user={user}/>
                        <div>
                            {type === 'ban' ?
                                <BanHandler
                                    user={user}
                                    setBanReason={setBanReason}
                                    banReason={banReason}
                                    unbanFunction={unbanUser}
                                    banFunction={banUser}
                                    unbanLoading={unbanLoading}
                                    banLoading={banLoading}
                                />
                                :
                                null
                            }
                        </div>
                        <div>
                            {type === 'role' ?
                                <div className={styles.roleControlContainer}>
                                    <RoleHandler
                                        user={user}
                                        incomingRole={'admin'}
                                        addFunction={addAdmin}
                                        removeFunction={removeAdmin}
                                        addLoading={addAdminLoading}
                                        removeLoading={removeAdminLoading}
                                    />
                                    <RoleHandler
                                        user={user}
                                        incomingRole={'tester'}
                                        addFunction={addTester}
                                        removeFunction={removeTester}
                                        addLoading={addTesterLoading}
                                        removeLoading={removeTesterLoading}
                                    />
                                    <RoleHandler
                                        user={user}
                                        incomingRole={'artist'}
                                        addFunction={addArtist}
                                        removeFunction={removeArtist}
                                        addLoading={addArtistLoading}
                                        removeLoading={removeArtistLoading}
                                    />
                                </div>
                                :
                                null
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