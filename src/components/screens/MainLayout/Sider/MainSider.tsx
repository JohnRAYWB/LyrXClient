import React, {useState} from 'react';
import styles from './styles/MainSider.module.css'
import Link from "next/link";
import {HomeFilled, SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";
import PlaylistSider from "./components/PlaylistSider";
import {getUserProps, getPlaylistsCollection, onClickLogout} from "@/hook/userHandlers";
import AdminToolSider from "./components/AdminToolSider";
import MenuSider from "./components/MenuSider";
import {profileItems} from "./components/MenuItems/ProfileItem";
import ArtistToolSider from "./components/ArtistToolSider";

import {userAbstract} from "@/api/dto/user.entity";
import Genre from "@/components/screens/MainLayout/Sider/components/Genre";

const HubHeader: React.FC = () => {

    const [current, setCurrent] = useState('')

    /*const user = getUserProps()
    const playlists = getPlaylistsCollection()*/

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