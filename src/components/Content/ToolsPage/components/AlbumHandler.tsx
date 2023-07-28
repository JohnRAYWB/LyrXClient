import React from 'react';
import {useFetchAllAlbumAndSearchQuery} from "@/store/api/AlbumApi";
import {useRouter} from "next/navigation";

interface Param {
    setTotalCount: Function
}

const AlbumHandler: React.FC<Param> = ({setTotalCount}) => {

    const {data: albums, isLoading} = useFetchAllAlbumAndSearchQuery('')

    if(isLoading) {
        return <></>
    }

    setTotalCount(albums.length)

    const router = useRouter()
    return (
        <div>

        </div>
    );
};

export default AlbumHandler;