import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Popover} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

import styles from './styles/CollectionHeader.module.css'
import TrackList from "@/components/Content/TrackPage/TrackList";
import useTextLength from "@/util/useTextLength";
import {userDto} from "@/api/dto/user.dto";
import {genreDto} from "@/api/dto/genre.dto";
import {trackDto} from "@/api/dto/track.dto";

interface Items {
    image: string
    name: string
    description: string
    favorites: number
    user: userDto
    tracks: trackDto[]
    genre: genreDto[]
}

const CollectionHeader: React.FC<Items> = ({image, name, description, favorites, user, tracks, genre}) => {

    let descriptionLength = description
    descriptionLength ? descriptionLength = useTextLength(description, 240) : description

    return (
        <div>
            <div className={styles.headerMain}>
                <div className={styles.headerContainer}>
                    <Image
                        className={styles.image}
                        priority={true}
                        quality={100}
                        width={250}
                        height={250}
                        src={`http://localhost:4221/${image}`}
                        alt={'collection_logo'}
                    />
                    <div className={styles.headerText}>
                        <h1 className={styles.textTitle}>{name[1]}</h1>
                        <Link className={styles.userLink} href={`/pth/hub/profile/${user._id}`}>{name[0]}</Link>
                        {
                            genre.length !== 0 ?
                                <p className={styles.genre}>
                                    GENRES:
                                    {genre.map((genre, index) =>
                                        <Link
                                            href={`/pth/hub/genre/${genre._id}`}
                                            key={index}
                                            className={styles.link}>
                                            {genre.name}
                                        </Link>
                                    )}
                                </p>
                                :
                                null
                        }
                        <div className={styles.scoresItem}>
                            <p className={styles.scoresItemLeft}>Favorites</p>
                            <p className={styles.scoresItemRight}>{favorites}</p>
                        </div>
                    </div>
                    <div className={styles.description}>
                        {
                            description && description.length > 240 ?
                                <>
                                    <Popover overlayStyle={{width: 600}} content={description}>
                                        <InfoCircleOutlined/>
                                    </Popover>
                                    <p>DESCRIPTION: {descriptionLength}</p>
                                </>
                                :
                                null
                        }
                        {
                            description && description.length < 240 ?
                                <p>DESCRIPTION: {description}</p>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
            <div className={styles.trackList}>
                <TrackList tracks={tracks}/>
            </div>
        </div>
    );
};

export default CollectionHeader;