import React, {ReactNode} from 'react';
import Link from "next/link";
import {HomeFilled, UserOutlined} from "@ant-design/icons";
import {MenuProps} from "antd";
import {destroyCookie} from "nookies";
import {useRouter} from "next/navigation";

import styles from './styles/MainSider.module.css'
import PlaylistSider from "./components/PlaylistSider";
import AdminToolSider from "./components/AdminToolSider";
import MenuSider from "./components/MenuSider";
import ArtistToolSider from "./components/ArtistToolSider";
import GenreSider from "@/components/screens/MainLayout/Sider/components/GenreSider";
import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";
import Image from "next/image";

interface SiderComponent {
    searchField: ReactNode
}

const HubHeader: React.FC<SiderComponent> = ({searchField}) => {

    const user = useAppSelector(selectUserData)
    const router = useRouter()

    if(!user) {
        return router.push('/')
    }

    const playlistLength = user.playlists.length
    const profileItems: MenuProps['items'] = [
        {
            label: 'Profile',
            key: 'SubMenu',
            style: {fontSize: 16, width: 280},
            icon: user.avatar ? <Image className={styles.avatar} width={40} height={40} src={`http://localhost:4221/profile/${user.username}/${user.avatar}`} alt={'avatar'}/> : <UserOutlined style={{fontSize: 16, marginRight: 10}}/>,
            children: [
                {
                    style: {fontSize: 14},
                    label: <Link href={'/pth/hub/users'}>Users</Link>,
                    key: 'option:1',
                },
                {
                    style: {fontSize: 14},
                    label: <Link href={'/pth/hub/profile'}>Open profile</Link>,
                    key: 'option:2',
                },
                {
                    style: {fontSize: 14},
                    label: <Link href={'/pth/hub/profile/collection'}>Your collection</Link>,
                    key: 'option:3',
                },
                {
                    label: (
                        <button className={styles.dropDownLogout} onClick={() => {
                            if (window.confirm("Are you sure to logout?")) {
                                destroyCookie(null, 'access_token', {path: '/'})
                                localStorage.clear()
                                router.push('/')
                            }
                        }}>Logout</button>
                    ),
                    key: 'option:4',
                }
            ],
        },
    ];

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.containerRow}>
                    <HomeFilled/>
                    <Link className={styles.rowElement} href={'/pth/hub'}>Home</Link>
                </div>
                <div>
                    {searchField}
                </div>
            </div>
            <div className={styles.dropDown}>
                <MenuSider items={profileItems}/>
            </div>
            <PlaylistSider playlists={playlistLength}/>
            <GenreSider/>
            <AdminToolSider roles={user.roles}/>
            <ArtistToolSider roles={user.roles}/>
        </main>
    );
};

export default HubHeader;