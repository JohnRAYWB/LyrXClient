import React from 'react';
import GenreList from "@/components/Content/GenrePage/GenreList";
import styles from "@/styles/Genre.module.css"

import {genres} from "@/api/dto/genre.entity";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const Index: NextPageWithLayout = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Billions of tracks for any genre</h1>
            <GenreList genres={genres}/>
        </div>
    );
};

Index.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Genres'}>{page}</MainLayout>
}
export default Index;