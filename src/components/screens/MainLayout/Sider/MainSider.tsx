import React, {useState} from 'react';
import styles from './styles/MainSider.module.css'
import Link from "next/link";
import {HomeFilled, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {Input, MenuProps} from "antd";
import PlaylistSider from "./components/PlaylistSider";
import AdminToolSider from "./components/AdminToolSider";
import MenuSider from "./components/MenuSider";
import ArtistToolSider from "./components/ArtistToolSider";

import {userAbstract} from "@/api/dto/user.entity";
import Genre from "@/components/screens/MainLayout/Sider/components/Genre";
import {destroyCookie} from "nookies";
import {useRouter} from "next/navigation";

const HubHeader: React.FC = () => {

    const [current, setCurrent] = useState('')

    const router = useRouter()

    const profileItems: MenuProps['items'] = [
        {
            label: 'Profile',
            key: 'SubMenu',
            style: {fontSize: 16, width: 280},
            icon: <UserOutlined style={{fontSize: 16, marginRight: 10}}/>,
            children: [
                {
                    style: {fontSize: 14},
                    label: <Link href={'/pth/hub/profile'}>Open profile</Link>,
                    key: 'option:1',
                },
                {
                    style: {fontSize: 14},
                    label: <Link href={'/pth/hub/profile/collection'}>Your collection</Link>,
                    key: 'option:2',
                },
                {
                    label: (
                        <button className={styles.dropDownLogout} onClick={() => {
                            if (window.confirm("Are you sure to logout?")) {
                                destroyCookie(null, 'access_token', {path: '/'})
                                router.push('/')
                            }
                        }}>Logout</button>
                    ),
                    key: 'option:3',
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
                <div className={styles.containerRow}>
                    <SearchOutlined/>
                    <Input
                        className={styles.rowInput}
                        bordered={false}
                        placeholder={'Search'}
                    />
                </div>
            </div>
            <div className={styles.dropDown}>
                <MenuSider items={profileItems}/>
            </div>
            <PlaylistSider playlists={userAbstract.playlistsCollection}/>
            <Genre/>
            <AdminToolSider roles={userAbstract.roles}/>
            <ArtistToolSider roles={userAbstract.roles}/>
        </main>
    );
};

export default HubHeader;