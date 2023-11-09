import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {LoadingOutlined} from "@ant-design/icons";

import styles from "@/components/Content/CollectionPage/styles/Collection.module.css";
import PlaylistCollection from "@/components/Content/CollectionPage/PlaylistCollection";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import Pagination from "@/util/Pagination";
import Collection from "@/components/Content/components/Collection";
import {useFetchAllPlaylistAndSearchQuery, useFetchAllPlaylistQuery} from "@/store/api/PlaylistApi";

const Playlist: NextPageWithLayout = () => {

    const [page, setPage] = useState(0)
    const [query, setQuery] = useState(null)
    const {
        data: searchingPlaylists,
        isLoading: searchLoading,
        isFetching: fetchingSearch
    } = useFetchAllPlaylistAndSearchQuery(query)
    const {data: playlists, isLoading: playlistLoading, isFetching: fetchingAll} = useFetchAllPlaylistQuery(page)

    if (searchLoading || playlistLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Playlists'} searchElement={<Search onChange={searchHandle}/>}>
            <PlaylistCollection
                children={
                    query ?
                        fetchingSearch ?
                            <div className={styles.emptyListContainer}>
                                <p className={styles.emptyList}>Searching playlists</p>
                                <LoadingOutlined className={styles.emptyList}/>
                            </div>
                            :
                            <div>
                                <Collection items={searchingPlaylists} type={'playlist'}/>
                            </div>
                        :
                        <Pagination
                            page={page}
                            setPage={setPage}
                            isFetching={fetchingAll}
                            children={<Collection items={playlists} type={'playlist'}/>}
                        />
                }
            />
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

export default Playlist;