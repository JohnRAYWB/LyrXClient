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
            <p className={styles.favText}>Most popular albums</p>
            <div className={styles.favItems}>
                <Carousel>
                    <Row items={firstRow} type={'album'}/>
                    <Row items={secondRow} type={'album'}/>
                </Carousel>
            </div>
            <p className={styles.listText}>Recently added</p>
            {children}
        </div>
    );
};

export default AlbumCollection;