import React from 'react';
import GenreList from "@/components/Content/GenrePage/GenreList";
import styles from "@/styles/Genre.module.css"
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {useFetchAllQuery} from "@/store/api/GenreApi";

const Genre: NextPageWithLayout = () => {

    const {data: genres, isLoading} = useFetchAllQuery(0)

    if(isLoading) {
        return <></>
    }

    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Billions of tracks for any genre</h1>
            <GenreList genres={genres}/>
        </div>
    );
};

Genre.getLayout = (page: React.ReactNode) => <MainLayout name={'Genres'}>{page}</MainLayout>

export default Genre;