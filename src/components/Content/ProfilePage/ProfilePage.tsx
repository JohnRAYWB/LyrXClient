import React, {useState} from 'react';
import Image from "next/image";
import {ConfigProvider, Input, notification, Popover, Tabs, TabsProps} from "antd";
import {
    CheckOutlined,
    InfoCircleOutlined, LoadingOutlined,
    PlusOutlined,
    UserAddOutlined,
    UserOutlined
} from "@ant-design/icons";
import Link from "next/link";
import {useRouter} from "next/navigation";

import styles from "./styles/ProfilePage.module.css"
import {userDto} from "@/api/dto/user.dto";
import {
    useFetchProfileQuery,
    useSubscribeUserMutation,
    useUploadAboutMutation,
    useUploadAvatarMutation
} from "@/store/api/UserApi";
import TrackList from "@/components/Content/TrackPage/TrackList";
import {PlaylistCollectionRow, AlbumCollectionRow} from "@/components/Content/components/ProfileCollectionRow";
import useTextLength from "@/util/useTextLength";
import FileUpload from "@/util/FileUpload";
import {profileImagePath} from "@/util/ImagePath";
import {useScoreLength} from "@/util/useScoreLength";

interface UserParam {
    user: userDto
    type: string
}

const Profile: React.FC<UserParam> = ({user, type}) => {

    const {data: loggedUser, isLoading} = useFetchProfileQuery()
    const [uploadAvatar] = useUploadAvatarMutation()
    const [uploadAbout] = useUploadAboutMutation()
    const [subscribe, {isLoading: subLoading}] = useSubscribeUserMutation()

    const [edit, setEdit] = useState(false)
    const [editAvatar, setEditAvatar] = useState()
    const [editAbout, setEditAbout] = useState(user.about)
    const [loading, setLoading] = useState(false)

    if (isLoading) {
        return <></>
    }

    const router = useRouter()

    const roles = user.roles.map(role => role.role).join(' | ')

    const items: TabsProps['items'] = [
        {
            tabKey: 'track',
            key: '1',
            label: 'TRACKS',
            children: <TrackList
                tracks={[].concat(user.tracks, user.tracksCollection).slice(0, 10).filter(track => track !== undefined)}/>
        },
        {
            tabKey: 'playlist',
            key: '2',
            label: 'PLAYLISTS',
            children: <PlaylistCollectionRow
                playlists={[].concat(user.playlists, user.playlistsCollection).filter(playlist => playlist !== undefined)}/>
        },
        {
            tabKey: 'album',
            key: '3',
            label: 'ALBUMS',
            children: <AlbumCollectionRow
                albums={[].concat(user.albums, user.albumsCollection).filter(album => album !== undefined)}/>
        },
    ]

    const subHandler = () => {
        try {
            subscribe(user._id)
            if (user.followers.findIndex(fellow => fellow._id === loggedUser._id) === -1) {
                notification.success({
                    style: {backgroundColor: "#646464", width: 300},
                    message: <p className={styles.notification}>Done!</p>,
                    description: <p className={styles.notification}>Subscribe successfully</p>,
                    placement: "bottomLeft",
                    duration: 2
                })
            } else {
                notification.success({
                    style: {backgroundColor: "#646464", width: 300},
                    message: <p className={styles.notification}>Done!</p>,
                    description: <p className={styles.notification}>Unsubscribe successfully</p>,
                    placement: "bottomLeft",
                    duration: 2
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleEditDone = () => {
            const formData = new FormData()
            formData.append('avatar', editAvatar)
            uploadAvatar(formData)
            uploadAbout({about: editAbout})
            notification.success({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Done!</p>,
                description: <p className={styles.notification}>Profile info edited</p>,
                placement: "bottomLeft",
                duration: 2
            })
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                {!edit ?
                    <>
                        {user.avatar ?
                            <div className={styles.avatarContainer}>
                                <Image
                                    priority={true}
                                    className={styles.avatar}
                                    width={195}
                                    height={195}
                                    src={profileImagePath(user)}
                                    alt={'avatar'}/>
                            </div>
                            :
                            <div className={styles.avatarContainer}>
                                <UserOutlined className={styles.emptyAvatar}/>
                            </div>
                        }
                        <div className={styles.infoContainer}>
                            <p className={styles.roles}>{roles}</p>
                            <h1 className={styles.infoUsername}>{user.username}</h1>
                            <h1 className={styles.infoEmail}>{user.email}</h1>
                            <div className={styles.description}>
                                {user.about ?
                                    user.about.length > 100 ?
                                        <>
                                            <Popover overlayStyle={{width: 600}} content={user.about}>
                                                <InfoCircleOutlined/>
                                            </Popover>
                                            <p className={styles.infoDescription}>{useTextLength(user.about, 100)}</p>
                                        </>
                                        :
                                        <>
                                            <InfoCircleOutlined/>
                                            <p className={styles.infoDescription}>{user.about}</p>
                                        </>
                                        :
                                    <>
                                        <InfoCircleOutlined/>
                                        <p className={styles.infoDescription}>You can add about yourself</p>
                                    </>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <div className={styles.editContainer}>
                        <FileUpload setFile={setEditAvatar} setStatus={setLoading} type={'image'}>
                            {!loading ?
                                <button className={styles.uploadFile}>
                                    <PlusOutlined/>
                                    <p>Upload</p>
                                </button>
                                :
                                <div className={styles.uploadedFile}>
                                    <CheckOutlined/>
                                    <p>Done</p>
                                </div>
                            }
                        </FileUpload>
                        <div className={styles.editAboutContainer}>
                            <p className={styles.editAboutText}>ABOUT</p>
                            <ConfigProvider theme={{
                                token: {
                                    colorBorder: '#232323FF',
                                    colorTextPlaceholder: '#404040',
                                    colorPrimary: '#ff2929',
                                }
                            }}>
                                <Input
                                    size={"large"}
                                    className={styles.editAboutInput}
                                    onChange={(e) => setEditAbout(e.target.value)}
                                    defaultValue={user.about}
                                />
                            </ConfigProvider>
                        </div>
                    </div>
                }
                <div className={styles.manageContainer}>
                    {
                        type === 'profile' ?
                            <>
                                {!edit ?
                                    <button onClick={() => setEdit(true)} className={styles.editButton}>Edit
                                        profile</button>
                                    :
                                    <button onClick={handleEditDone} className={styles.editButton}>Done</button>
                                }
                            </>
                            :
                            <>
                                {
                                    subLoading ?
                                        <div className={styles.loadContainer}>
                                            <p>Processing</p>
                                            <LoadingOutlined className={styles.loading}/>
                                        </div>
                                        :
                                        <UserAddOutlined
                                            onClick={subHandler}
                                            className={user.followers.findIndex(fellow => fellow._id === loggedUser._id) !== -1 ?
                                                styles.subscribedButton
                                                :
                                                styles.editButton}
                                        />
                                }
                            </>
                    }
                    <div className={styles.followContainer}>
                        <div className={styles.followElement}>
                            <p className={styles.followText}>Followers</p>
                            <p
                                onClick={() => router.push(`/pth/hub/users/followers/${user._id}`)}
                                className={styles.followButton}>
                                {useScoreLength(user.followers.length)}
                            </p>
                        </div>
                        <div className={styles.followElement}>
                            <p className={styles.followText}>Followings</p>
                            <p
                                onClick={() => router.push(`/pth/hub/users/followings/${user._id}`)}
                                className={styles.followButton}>
                                {useScoreLength(user.followings.length)}
                            </p>
                        </div>
                    </div>
                </div>
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
            <Link className={styles.collectionLink} href={type === 'profile' ?
                '/pth/hub/profile/collection'
                :
                `/pth/hub/users/collection/${user._id}`}
            >See more</Link>
        </div>
    );
};

export default Profile