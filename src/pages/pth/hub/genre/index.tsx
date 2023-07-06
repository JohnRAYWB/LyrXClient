import React from 'react';
import GenreList from "@/components/Content/GenrePage/GenreList";
import styles from "@/styles/Genre.module.css"

import {genres} from "@/api/dto/genre.entity";
import {NextPage} from "next";

const Index: NextPage = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Billions of tracks for any genre</h1>
            <GenreList genres={genres}/>
        </div>
    );
};

Index.displayName = 'Genres'
export default Index;