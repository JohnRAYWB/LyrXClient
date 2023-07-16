import React from 'react';
import CollectionHeader from "@/components/Content/CollectionSelfPage/CollectionHeader";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {useFetchByIdQuery} from "@/store/api/PlaylistApi";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";

interface PageParams {
    playlistId: string
}

const PlaylistPage: NextPageWithLayout<PageParams> = ({playlistId}) => {

    const {data: playlist, isLoading} = useFetchByIdQuery(playlistId)

    if(isLoading) {
        return <></>
    }

    const {image, name, description, favorites, user, tracks, genre} = playlist
    const collectionImage = `playlist/${name[0]}/${image}`

    return (
        <div>
            <CollectionHeader
                image={collectionImage}
                name={name}
                description={description}
                favorites={favorites}
                user={user}
                tracks={tracks}
                genre={genre}
            />
        </div>
    );
}

PlaylistPage.getLayout = (page: React.ReactNode) => <MainLayout name={'Playlist'}>{page}</MainLayout>

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
                playlistId: ctx.params.id
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default PlaylistPage;