import React from 'react';
import Collection from "@/components/Content/components/Collection";
import styles from "./styles/Collection.module.css"
import {albumDto} from "@/api/dto/album.dto";
import {usePreparedAlbumEntities} from "@/util/usePreparedDataEntity";
import Row from "@/components/Content/components/Row";
import {Carousel} from "antd";
import {useFetchAllAndSearchQuery, useFetchMostLikedQuery} from "@/store/api/AlbumApi";

const AlbumCollection: React.FC = () => {

    const {data: albums} = useFetchAllAndSearchQuery('')
    const {data: firstLiked} = useFetchMostLikedQuery(0)
    const {data: secondLiked} = useFetchMostLikedQuery(5)

    return (
        <div className={styles.main}>
            <p className={styles.favText}>Most popular albums</p>
            <div className={styles.favItems}>
                <Carousel>
                    <Row items={firstLiked} type={'album'}/>
                    <Row items={secondLiked} type={'album'}/>
                </Carousel>
            </div>
            <p className={styles.listText}>Recently added</p>
            <Collection items={albums} type={'album'}/>
        </div>
    );
};

export default AlbumCollection;