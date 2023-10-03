import React from 'react';
import {Carousel} from "antd";

import styles from "./styles/Collection.module.css"
import Collection from "@/components/Content/components/Collection";
import Row from "@/components/Content/components/Row";
import {albumDto} from "@/api/dto/album.dto";
import {useFetchMostLikedAlbumQuery} from "@/store/api/AlbumApi";

interface AlbumParams {
    children: React.ReactNode
}

const AlbumCollection: React.FC<AlbumParams> = ({children}) => {

    const {data: likedAlbums, isLoading} = useFetchMostLikedAlbumQuery(null)

    if(isLoading) {
        return <></>
    }

    const firstRow = likedAlbums.slice(0, 5)
    const secondRow = likedAlbums.slice(5, 10)

    return (
        <div className={styles.main}>
            <div className={styles.favoritesContainer}>
                <h1 className={styles.favoritesTitle}>Most popular albums</h1>
                <div className={styles.favoritesItems}>
                    <Carousel style={{paddingBottom: 30}}>
                        <Row items={firstRow} type={'album'}/>
                        <Row items={secondRow} type={'album'}/>
                    </Carousel>
                </div>
            </div>
            <div className={styles.mainListContainer}>
                <h1 className={styles.listTitle}>Recently added</h1>
                <div className={styles.listContainer}>{children}</div>
            </div>
        </div>
    );
};

export default AlbumCollection;