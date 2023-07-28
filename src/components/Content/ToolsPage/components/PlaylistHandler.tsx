import React from 'react';
import {useFetchAllPlaylistAndSearchQuery} from "@/store/api/PlaylistApi";
import {useRouter} from "next/navigation";

interface Param {
    setTotalCount: Function
}

const PlaylistHandler: React.FC<Param> = ({setTotalCount}) => {

    const {data: playlists, isLoading} = useFetchAllPlaylistAndSearchQuery('')

    if(isLoading) {
        return <></>
    }

    setTotalCount(playlists.length)

    const router = useRouter()

    return (
        <div>

        </div>
    );
};

export default PlaylistHandler;