import React, {useState} from 'react';

import styles from "./styles/UserCollectionHeader.module.css"
import {userDto} from "@/api/dto/user.dto";
import CollectionCountsHead from "@/components/Content/UserCollectionPage/components/CollectionCountsHead";
import Image from "next/image";
import {UserOutlined} from "@ant-design/icons";
import TrackList from "@/components/Content/TrackPage/TrackList";
import ArtistHeader from "@/components/Content/UserCollectionPage/components/ArtistHeader";
import {profileImagePath} from "@/util/ImagePath";

interface UserCollectionParam {
    user: userDto
    type: string
}

const UserCollectionHeader: React.FC<UserCollectionParam> = ({user, type}) => {

    const [children, setChildren] = useState(<TrackList tracks={user.tracksCollection}/>)

    if (type === 'user') {
        return (
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    {user.avatar ?
                        <Image
                            width={100}
                            height={100}
                            priority={true}
                            src={profileImagePath(user)}
                            alt={'user_avatar'}
                            className={styles.avatar}
                        />
                        :
                        <UserOutlined className={styles.emptyAvatar}/>
                    }
                    <p className={styles.title}>{user.username}'s collection</p>
                    <CollectionCountsHead
                        track={user.tracksCollection}
                        playlist={user.playlistsCollection}
                        album={user.albumsCollection}
                        setChildren={setChildren}
                    />
                </div>
                {user.roles.findIndex(role => role.role === 'artist') !== -1 ?
                    <ArtistHeader track={user.tracks} album={user.albums} setChildren={setChildren}/>
                    :
                    null
                }
                <div className={styles.children}>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                {
                    user.avatar ?
                        <Image
                            width={100}
                            height={100}
                            priority={true}
                            src={profileImagePath(user)}
                            alt={'user_avatar'}
                            className={styles.avatar}
                        />
                        :
                        <UserOutlined className={styles.emptyAvatar}/>
                }
                <p className={styles.title}>My collection</p>
                <CollectionCountsHead
                    track={user.tracksCollection}
                    playlist={[].concat(user.playlistsCollection, user.playlists)}
                    album={user.albumsCollection}
                    setChildren={setChildren}
                />
            </div>
            {user.roles.findIndex(role => role.role === 'artist') !== -1 ?
                <ArtistHeader track={user.tracks} album={user.albums} setChildren={setChildren}/>
                :
                null
            }
            <div className={styles.children}>
                {children}
            </div>
        </div>
    );
};

export default UserCollectionHeader