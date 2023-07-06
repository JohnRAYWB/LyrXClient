import React from 'react';
import Image from "next/image";
import {ConfigProvider, Tabs, TabsProps} from "antd";
import styles from "@/styles/Profile.module.css"
import {InfoCircleOutlined} from "@ant-design/icons";
import TrackList from "@/components/Content/TrackPage/TrackList";
import {PlaylistCollectionRow, AlbumCollectionRow} from "@/components/Content/components/ProfileCollectionRow";
import Link from "next/link";

import {userAbstract} from "@/api/dto/user.entity";
import {NextPage} from "next";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'TRACKS',
        children: <TrackList tracks={[].concat(userAbstract.tracks, userAbstract.tracksCollection).slice(0, 10)}/>
    },
    {
        key: '2',
        label: 'PLAYLISTS',
        children: [userAbstract.playlistsCollection.length ?
            <PlaylistCollectionRow playlists={userAbstract.playlistsCollection}/>
            :
            <p>You don't have playlists yet</p>
        ]
    },
    {
        key: '3',
        label: 'ALBUMS',
        children: [userAbstract.albumsCollection.length ?
            <AlbumCollectionRow albums={userAbstract.albumsCollection}/>
            :
            <p>You don't have added albums yet</p>
        ]
    },
]

const Index: NextPage = () => {

    const roles = userAbstract.roles.map(role => role.role).join(' | ')

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Image priority={true} className={styles.avatar} width={200} height={200} src={userAbstract.avatar}
                       alt={'avatar'}/>
                <div className={styles.infoContainer}>
                    <div className={styles.description}>
                        <p className={styles.roles}>{roles}</p>
                    </div>
                    <h1 className={styles.infoUsername}>{userAbstract.username}</h1>
                    <div className={styles.description}>
                        <InfoCircleOutlined/>
                        <p className={styles.infoDescription}>{userAbstract.about}</p>
                    </div>
                    <div className={styles.followContainer}>
                        <div className={styles.followElement}>
                            <h1 className={styles.followText}>Followers:</h1>
                            <button className={styles.followButton}>{userAbstract.followers.length}</button>
                        </div>
                        <div className={styles.followElement}>
                            <h1 className={styles.followText}>Followings:</h1>
                            <button className={styles.followButton}>{userAbstract.followings.length}</button>
                        </div>
                    </div>
                </div>
                <button className={styles.editButton}>Edit profile</button>
            </div>
            <div className={styles.collectionContainer}>
                <ConfigProvider theme={{
                    token: {
                        colorPrimary: "#F64141",
                        colorBorderSecondary: "#343434",
                    }
                }}>
                    <Tabs
                        centered
                        defaultActiveKey={'1'}
                        items={items}
                        tabBarStyle={{color: '#888888'}}
                    />
                </ConfigProvider>
            </div>
            <Link className={styles.collectionLink} href={'/pth/hub/profile/collection'}>See more</Link>
        </div>
    );
};

Index.displayName = 'Profile'
export default Index;