import React from 'react';
import Image from "next/image";
import useTextLength from "@/util/useTextLength";
import {Popover} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import styles from './styles/CollectionHeader.module.css'
import {genreDto} from "@/api/dto/genre.dto";
import {trackDto} from "@/api/dto/track.dto";
import TrackList from "@/components/Content/TrackPage/TrackList";

interface Items {
    image: string
    name: string
    description: string
    favorites: number
    tracks: trackDto[]
    genre: genreDto[]
}

const CollectionHeader: React.FC<Items> = ({image, name, description, favorites, tracks,genre}) => {

    const descriptionLength = useTextLength(description, 200)
    const genres = genre.map(gen => [].concat(gen.name)).join(' | ')


    return (
        <div>
            <div className={styles.headerMain}>
                <div className={styles.headerContainer}>
                    <Image className={styles.image} priority={true} quality={100} width={250} height={250} src={image}
                           alt={'playlist_logo'}/>
                    <div className={styles.headerText}>
                        <h1 className={styles.textTitle}>{name}</h1>
                        {genres.length !== 0 ? <p className={styles.genre}>GENRES: {genres}</p> : null}
                        <div className={styles.scoresItem}>
                            <p className={styles.scoresItemLeft}>Favorites</p>
                            <p className={styles.scoresItemRight}>{favorites}</p>
                        </div>
                        <div className={styles.description}>
                            {description.length > 200 ?
                                <>

                                    <Popover overlayStyle={{width: 600}} content={description}>
                                        <InfoCircleOutlined/>
                                    </Popover>
                                    <p>DESCRIPTION: {descriptionLength}</p>
                                </>
                                :
                                <p>DESCRIPTION: {descriptionLength}</p>
                            }
                        </div>
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