import React from 'react';
import Collection from "@/components/Content/components/Collection";
import styles from "./styles/Collection.module.css"
import {albumDto} from "@/api/dto/album.dto";
import {usePreparedAlbumEntities} from "@/util/usePreparedDataEntity";
import Row from "@/components/Content/components/Row";
import {Carousel} from "antd";

interface AlbumCollection {
    albums: albumDto[]
}

const AlbumCollection: React.FC<AlbumCollection> = ({albums}) => {

    const preparedData = usePreparedAlbumEntities(albums)
    const mostLiked = preparedData.sort((a, b) => b.favorites - a.favorites).slice(0, 10)

    return (
        <div className={styles.main}>
            <p className={styles.favText}>Most popular albums</p>
            <div className={styles.favItems}>
                {mostLiked.length > 5 ?
                    <>
                        <Carousel>
                            <Row items={mostLiked.slice(0, 5)}/>
                            <Row items={mostLiked.slice(5, 10)}/>
                        </Carousel>
                    </>
                    :
                    <Row items={mostLiked}/>
                }
            </div>
            <p className={styles.listText}>Recently added</p>
            <Collection items={preparedData}/>
        </div>
    );
};

export default AlbumCollection;