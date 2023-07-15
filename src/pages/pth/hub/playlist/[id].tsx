import React, {useState} from 'react';
import CollectionHeader from "@/components/Content/CollectionSelfPage/CollectionHeader";
import {playlistDto} from "@/api/dto/playlist.dto";
import axios from "axios";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const PlaylistPage: NextPageWithLayout = ({serverPlaylist}) => {

    const [playlist, setPlaylist] = useState<playlistDto>(serverPlaylist)
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

PlaylistPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Playlist'}>{page}</MainLayout>
}
export default PlaylistPage;

export const getServerSideProps: ({params}) => Promise<{ props: { serverTrack: playlistDto } }> = async ({params}) => {
    const response = await axios.get(`http://localhost:4221/playlists/${params.id}/current`)
    const playlist = response.data

    return {
        props: {
            serverPlaylist: playlist
        }
    }
}