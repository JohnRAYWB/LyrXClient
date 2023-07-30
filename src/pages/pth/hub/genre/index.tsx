import React from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import styles from "@/styles/Genre.module.css"
import {useFetchAllGenreQuery} from "@/store/api/GenreApi";
import GenreList from "@/components/Content/GenrePage/GenreList";

const Genre: NextPageWithLayout = () => {

    const {data: genres, isLoading} = useFetchAllGenreQuery()

    if (isLoading) {
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if (!access_token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default Genre;