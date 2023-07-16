import React from 'react';
import Image from "next/image";
import {ConfigProvider, Popover, Tabs, TabsProps} from "antd";
import styles from "@/styles/Profile.module.css"
import {InfoCircleOutlined} from "@ant-design/icons";
import TrackList from "@/components/Content/TrackPage/TrackList";
import {PlaylistCollectionRow, AlbumCollectionRow} from "@/components/Content/components/ProfileCollectionRow";
import Link from "next/link";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import useTextLength from "@/util/useTextLength";
import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";
import {NextPageWithLayout} from "@/pages/_app";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";

const Profile: NextPageWithLayout = () => {

    const user = useAppSelector(selectUserData)

    const roles = user.roles.map(role => role.role).join(' | ')

    let about = ''
    let emptyAbout = ''

    if(user.about === undefined) {
        emptyAbout = `You can add about yourself`
    }

    user.about !== undefined && user.about.length > 150 ? about = useTextLength(user.about, 150) : about = user.about

    const items: TabsProps['items'] = [
        {
            tabKey: 'track',
            key: '1',
            label: 'TRACKS',
            children: [user.tracks || user.tracksCollection ?
                <TrackList
                    tracks={[].concat(user.tracks, user.tracksCollection).slice(0, 10).filter(track => track !== undefined)}/>
                :
                <p className={styles.collectionEmpty}>You don't have added tracks yet</p>
            ]
        },
        {
            tabKey: 'playlist',
            key: '2',
            label: 'PLAYLISTS',
            children: [user.playlists || user.playlistsCollection ?
                <PlaylistCollectionRow
                    playlists={[].concat(user.playlists, user.playlistsCollection).filter(playlist => playlist !== undefined)}/>
                :
                <p className={styles.collectionEmpty}>You don't have added playlists yet</p>
            ]
        },
        {
            tabKey: 'album',
            key: '3',
            label: 'ALBUMS',
            children: [user.albums || user.albumsCollections ?
                <AlbumCollectionRow
                    albums={[].concat(user.albums, user.albumsCollections).filter(album => album !== undefined)}/>
                :
                <p className={styles.collectionEmpty}>You don't have added albums yet</p>
            ]
        },
    ]

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Image
                    priority={true}
                    className={styles.avatar}
                    width={200}
                    height={200}
                    src={`http:localhost:4221/profile/${user.username}/${user.avatar}`}
                    alt={'avatar'}/>
                <div className={styles.infoContainer}>
                    <p className={styles.roles}>{roles}</p>
                    <h1 className={styles.infoUsername}>{user.username}</h1>
                    <h1 className={styles.infoEmail}>{user.email}</h1>
                    <div className={styles.description}>
                        {user.about === undefined ?
                            <>
                                <InfoCircleOutlined/>
                                <p className={styles.infoDescription}>{emptyAbout}</p>
                            </>
                            :
                            about.length > 150 ?
                                    <>
                                        <Popover overlayStyle={{width: 600}} content={user.about}>
                                            <InfoCircleOutlined/>
                                        </Popover>
                                        <p className={styles.infoDescription}>{about}</p>
                                    </>
                                    :
                                    <>
                                        <InfoCircleOutlined/>
                                        <p className={styles.infoDescription}>{about}</p>
                                    </>
                        }
                    </div>
                    <div className={styles.followContainer}>
                        <div className={styles.followElement}>
                            <h1 className={styles.followText}>Followers:</h1>
                            <button className={styles.followButton}>{user.followers.length}</button>
                        </div>
                        <div className={styles.followElement}>
                            <h1 className={styles.followText}>Followings:</h1>
                            <button className={styles.followButton}>{user.followings.length}</button>
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
                        defaultActiveKey={'track'}
                        items={items}
                        tabBarStyle={{color: '#888888'}}
                    />
                </ConfigProvider>
            </div>
            <Link className={styles.collectionLink} href={'/pth/hub/profile/collection'}>See more</Link>
        </div>
    );
};

Profile.getLayout = (page: React.ReactNode) => <MainLayout name={'Profile'}>{page}</MainLayout>

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if (!access_token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default Profile