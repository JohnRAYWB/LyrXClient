import React, {useState} from 'react';
import CollectionHeader from "@/components/Content/CollectionSelfPage/CollectionHeader";
import axios from "axios";
import {albumDto} from "@/api/dto/album.dto";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const AlbumPage: NextPageWithLayout = ({serverAlbum}) => {

    const [album, setAlbum] = useState<albumDto>(serverAlbum)
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

AlbumPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Album Page'}>{page}</MainLayout>
}
export default AlbumPage;

export const getServerSideProps: ({params}) => Promise<{ props: { serverTrack: albumDto } }> = async ({params}) => {
    const response = await axios.get(`http://localhost:4221/albums/${params.id}/current`)
    const album = response.data

    return {
        props: {
            serverAlbum: album
        }
    }
}