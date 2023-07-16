import React from 'react';
import Collection from "@/components/Content/components/Collection";
import styles from "./styles/Collection.module.css"
import Row from "@/components/Content/components/Row";
import {Carousel} from "antd";
import {useFetchAllAndSearchQuery, useFetchMostLikedQuery} from "@/store/api/AlbumApi";

const AlbumCollection: React.FC = () => {

    const {data: albums, isLoading} = useFetchAllAndSearchQuery('')
    const {data: likedAlbums, isFetching} = useFetchMostLikedQuery(null)

    if(isLoading || isFetching) {
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
            <Collection items={albums} type={'album'}/>
        </div>
    );
};

export default AlbumCollection;