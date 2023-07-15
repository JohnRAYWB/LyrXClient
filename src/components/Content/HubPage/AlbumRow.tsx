import React from 'react';
import Link from "next/link";
import Row from "@/components/Content/components/Row";
import styles from "./styles/HubRows.module.css"
import {Carousel} from "antd";
import {useFetchMostLikedQuery} from "@/store/api/AlbumApi";

const AlbumRow = () => {

    const {data: firstLiked} = useFetchMostLikedQuery(0)
    const {data: secondLiked} = useFetchMostLikedQuery(5)

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Album</h1>
                <Link className={styles.link} href={'/pth/hub/album'}>See all</Link>
            </div>
            <div className={styles.rowContainer}>
                <Carousel>
                    <Row items={firstLiked} type={'album'}/>
                    <Row items={secondLiked} type={'album'}/>
                </Carousel>
            </div>
        </div>
    );
};

export default AlbumRow;