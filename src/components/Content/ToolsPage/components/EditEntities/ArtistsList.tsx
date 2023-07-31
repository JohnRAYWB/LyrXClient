import React from 'react';

import styles from "../../styles/ArtistList.module.css"
import {userDto} from "@/api/dto/user.dto";
import Image from "next/image";
import {UserOutlined} from "@ant-design/icons";

interface Param {
    artists: userDto[]
    selectedArtist: userDto
    setSelectedArtist: Function
}

const ArtistsList: React.FC<Param> = ({artists, selectedArtist, setSelectedArtist}) => {
    return (
        <div className={styles.usersContainer}>
            {artists.map(artist =>
                <div
                    className={selectedArtist === artist ? styles.selectedArtist : styles.userContainer}
                    onClick={() => setSelectedArtist(artist)}>
                    {artist.avatar ?
                        <Image
                            className={styles.avatar}
                            width={50}
                            height={50}
                            priority={true}
                            quality={50}
                            src={`http://localhost:4221/profile/${artist.username}/${artist.avatar}`}
                            alt={'artist_avatar'}
                        />
                        :
                        <UserOutlined className={styles.emptyAvatar}/>
                    }
                    <p>{artist.username}</p>
                    <div className={styles.scoreEditContainer}>
                        <p className={styles.scoreTitleEdit}>followers</p>
                        <p className={styles.scoreCountEdit}>{artist.followers.length}</p>
                    </div>
                    <div className={styles.scoreEditContainer}>
                        <p className={styles.scoreTitleEdit}>tracks</p>
                        <p className={styles.scoreCountEdit}>{artist.tracks.length}</p>
                    </div>
                    <div className={styles.scoreEditContainer}>
                        <p className={styles.scoreTitleEdit}>albums</p>
                        <p className={styles.scoreCountEdit}>{artist.albums.length}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistsList;