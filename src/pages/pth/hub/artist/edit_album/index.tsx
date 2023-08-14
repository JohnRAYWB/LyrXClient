import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import styles from "@/components/Content/ArtistTools/styles/EditArtistEntitiesTool.module.css"
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import Pagination from "@/util/Pagination";
import EditArtistEntitiesTool from "@/components/Content/ArtistTools/EditArtistEntitiesTool";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {useFetchArtistsAlbumsAndSearchQuery, useFetchArtistsAlbumsQuery} from "@/store/api/AlbumApi";
import {LoadingOutlined} from "@ant-design/icons";


const EditAlbum: NextPageWithLayout = () => {

    const [query, setQuery] = useState(null)
    const [page, setPage] = useState(0)

    const {data: user, isLoading: userLoading} = useFetchProfileQuery()
    const {data: pagAlbums, isLoading: pagLoading, isFetching: pagFetching} = useFetchArtistsAlbumsQuery(page)
    const {data: searchAlbums, isLoading: searchLoading, isFetching: searchFetching} = useFetchArtistsAlbumsAndSearchQuery(query)

    if(userLoading || pagLoading || searchLoading) {
        return <></>
    }

    if (user.roles.findIndex(role => role.role === 'artist') === -1) {
        return <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }
    console.log(pagAlbums)
    return (
        <MainLayout name={'Edit Albums'} searchElement={<Search onChange={searchHandle}/>}>
            {query ?
                searchFetching ?
                    <div className={styles.emptyListContainer}>
                        <p className={styles.emptyList}>Searching album</p>
                        <LoadingOutlined className={styles.emptyList}/>
                    </div>
                    :
                    <EditArtistEntitiesTool type={'album'} action={'edit'} entities={searchAlbums}/>
                :
                <Pagination
                    page={page}
                    setPage={setPage}
                    isFetching={pagFetching}
                    children={<EditArtistEntitiesTool type={'album'} action={'edit'} entities={pagAlbums}/>}
                />
            }
        </MainLayout>
    );
};

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

export default EditAlbum;