import React from 'react';
import PlaylistCollection from "@/components/Content/PlaylistPage/PlaylistCollection";
import {usePreparedPlaylistEntities} from "@/util/usePreparedDataEntity";
import Row from "@/components/Content/components/Row";
import styles from "@/styles/Playlist.module.css"

import {playlists} from "@/api/dto/tracks.entity"
import {Carousel} from "antd";
import {CaretLeftOutlined, CaretRightOutlined} from "@ant-design/icons";


const Index = () => {

    const preparedData = usePreparedPlaylistEntities(playlists)
    const mostLiked = preparedData.sort((a, b) => b.favorites - a.favorites).slice(0, 10)


    return (
        <div className={styles.main}>
            <div className={styles.fav}>
                <p className={styles.favText}>Most popular playlists</p>
                <div className={styles.favItems}>
                    <Carousel nextArrow={<CaretRightOutlined className={styles.arrow}/>} prevArrow={<CaretLeftOutlined className={styles.arrow}/>}>
                        <Row items={mostLiked.slice(0,5)}/>
                        <Row items={mostLiked.slice(5, 10)}/>
                    </Carousel>
                </div>
            </div>
            <p className={styles.listText}>Community playlists</p>
            <PlaylistCollection playlists={preparedData}/>
        </div>
    );
};

export default Index;