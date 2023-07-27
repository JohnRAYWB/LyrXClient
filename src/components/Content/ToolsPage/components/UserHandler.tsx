import React from 'react';

import styles from "../styles/UserHandler.module.css"
import {useFetchAllUserAndSearchQuery} from "@/store/api/UserApi";
import {useRouter} from "next/navigation";

interface Param {
    setTotalCount: Function
}

const UserHandler: React.FC<Param> = ({setTotalCount}) => {

    const {data: users, isLoading} = useFetchAllUserAndSearchQuery('')

    if (isLoading) {
        return <></>
    }

    const router = useRouter()
    setTotalCount(users.length)

    const membersForDay = users.filter(user => {
        const date = new Date(user.createdTime).toLocaleDateString().split('.')
        const now = new Date(Date.now()).toLocaleDateString().split('.')
        if (now[0] === date[0] && now[1] === date[1] && now[2] === date[2]) {
            return user
        }
    }).length

    const adminCount = users.filter(user => user.roles.filter(role => role.role === 'admin').length).length
    const testerCount = users.filter(user => user.roles.filter(role => role.role === 'tester').length).length
    const artistCount = users.filter(user => user.roles.filter(role => role.role === 'artist').length).length
    const userCount = users.filter(user => user.roles.filter(role => role.role === 'user').length).length

    const banned = users.filter(user => user.ban).length

    return (
        <div className={styles.detailedStatContainer}>
            <h1 className={styles.detailedStatTitle}>Users Statistic</h1>
            <div className={styles.detailedStatEntitiesContainer}>
                <h1 className={styles.detailedEntityTitle}>Roles & Responsibilities</h1>
                <div className={styles.detailedStatEntities}>
                    <div className={styles.detailedStatEntity}>
                        <div className={styles.detailedScore}>
                            <p className={styles.detailedScoreTitle}>Admins</p>
                            <p className={styles.detailedScoreCount}>{adminCount}</p>
                        </div>
                        <p className={styles.detailedDesc}>Main fellow in this case</p>
                    </div>
                    <div className={styles.detailedStatEntity}>
                        <div className={styles.detailedScore}>
                            <p className={styles.detailedScoreTitle}>Testers</p>
                            <p className={styles.detailedScoreCount}>{testerCount}</p>
                        </div>
                        <p className={styles.detailedDesc}>Helping admin find and fix bugs</p>
                    </div>
                    <div className={styles.detailedStatEntity}>
                        <div className={styles.detailedScore}>
                            <p className={styles.detailedScoreTitle}>Artists</p>
                            <p className={styles.detailedScoreCount}>{artistCount}</p>
                        </div>
                        <p className={styles.detailedDesc}>Upload own tracks and albums</p>
                    </div>
                    <div className={styles.detailedStatEntity}>
                        <div className={styles.detailedScore}>
                            <p className={styles.detailedScoreTitle}>Users</p>
                            <p className={styles.detailedScoreCount}>{userCount}</p>
                        </div>
                        <p className={styles.detailedDesc}>Regular guy</p>
                    </div>
                </div>
                <h1 className={styles.detailedEntityTitle}>Last updates</h1>
                <div className={styles.updatesContainer}>
                    <div className={styles.updatesMembers}>
                        <div className={styles.updatesMember}>
                            <p className={styles.memberTitle}>Total Members</p>
                            <p className={styles.memberScore}>{users.length}</p>
                        </div>
                        <div className={styles.updatesMember}>
                            <p className={styles.memberTitle}>For the day</p>
                            <p className={styles.memberScore}>{membersForDay}</p>
                        </div>
                    </div>
                    <div className={styles.updatesBanned}>
                        <p className={styles.bannedTitle}>Total banned users</p>
                        <p className={styles.bannedScore}>{banned}</p>
                    </div>
                </div>
            </div>
            <h1 className={styles.detailedStatTitle}>User Control Tools</h1>
            <div className={styles.adminToolContainer}>
                <p onClick={() => router.push('/pth/hub/admin/ban')} className={styles.adminToolButton}>Ban | Unban User</p>
                <p onClick={() => router.push('/pth/hub/admin/role')} className={styles.adminToolButton}>Add | Remove Role</p>
            </div>
        </div>
    );
};

export default UserHandler;