import React from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import {useFetchAlbumByIdQuery} from "@/store/api/AlbumApi";
import CollectionHeader from "@/components/Content/CollectionSelfPage/CollectionHeader";

interface PageParams {
    albumId: string
}

const AlbumPage: NextPageWithLayout<PageParams> = ({albumId}) => {

    const {data: album, isLoading} = useFetchAlbumByIdQuery(albumId)

    if(isLoading) {
        return <></>
    }

    const {image, name, description, favorites, artist, tracks, genre} = album
    const collectionImage = `album/${name[0]}/${image}`

    return (
        <div>
            <CollectionHeader
                image={collectionImage}
                name={name}
                description={description}
                favorites={favorites}
                user={artist}
                tracks={tracks}
                genre={genre}
            />
        </div>
    );
};

AlbumPage.getLayout = (page: React.ReactNode) =>  <MainLayout name={'Album Page'}>{page}</MainLayout>

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if(!access_token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        return {
            props: {
                albumId: ctx.params.id
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default AlbumPage;