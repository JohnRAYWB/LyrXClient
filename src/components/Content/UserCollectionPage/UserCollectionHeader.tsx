import React, {useState} from 'react';

import styles from "./styles/UserCollectionHeader.module.css"
import {userDto} from "@/api/dto/user.dto";
import CollectionCountsHead from "@/components/Content/UserCollectionPage/components/CollectionCountsHead";
import Image from "next/image";
import {UserOutlined} from "@ant-design/icons";
import TrackList from "@/components/Content/TrackPage/TrackList";
import ArtistHeader from "@/components/Content/UserCollectionPage/components/ArtistHeader";

interface UserCollectionParam {
    user: userDto
    type: string
}

const UserCollectionHeader: React.FC<UserCollectionParam> = ({user, type}) => {

    const [children, setChildren] = useState(<TrackList tracks={user.tracksCollection}/>)

    if (type === 'user') {
        return (
            <div>
                <div className={styles.headerContainer}>
                    {user.avatar ?
                        <Image
                            width={100}
                            height={100}
                            priority={true}
                            src={`http:/localhost:4221/profile/${user.username}/${user.avatar}`}
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
        <div>
            <div className={styles.headerContainer}>
                {
                    user.avatar ?
                        <Image
                            width={100}
                            height={100}
                            priority={true}
                            src={`http:/localhost:4221/profile/${user.username}/${user.avatar}`}
                            alt={'user_avatar'}
                            className={styles.avatar}
                        />
                        :
                        <UserOutlined className={styles.emptyAvatar}/>
                }
                <p className={styles.title}>My collection</p>
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
    );
};

export default UserCollectionHeader