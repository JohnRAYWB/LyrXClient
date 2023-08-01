import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";

import styles from "@/components/Content/CollectionPage/styles/Collection.module.css";
import AlbumCollection from "@/components/Content/CollectionPage/AlbumCollection";
import {useFetchAllAlbumAndSearchQuery, useFetchAllAlbumQuery} from "@/store/api/AlbumApi";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import Collection from "@/components/Content/components/Collection";
import Pagination from "@/util/Pagination";
import {LoadingOutlined} from "@ant-design/icons";

const Album: NextPageWithLayout = () => {

    const [page, setPage] = useState(0)
    const [query, setQuery] = useState('')
    const {
        data: searchingAlbums,
        isLoading: searchingLoading,
        isFetching: fetchingSearch
    } = useFetchAllAlbumAndSearchQuery(query)
    const {data: albums, isLoading: albumLoading, isFetching: fetchingAll} = useFetchAllAlbumQuery(page)

    if (searchingLoading || albumLoading) {
        return <></>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }
    return (
        <MainLayout name={'Albums'} searchElement={<Search onChange={searchHandle}/>}>
            <AlbumCollection children={
                query ?
                    fetchingSearch ?
                        <div className={styles.emptyListContainer}>
                            <p className={styles.emptyList}>Searching playlists</p>
                            <LoadingOutlined className={styles.emptyList}/>
                        </div>
                        :
                        <Collection items={searchingAlbums} type={'album'}/>
                    :
                    <Pagination
                        page={page}
                        setPage={setPage}
                        isFetching={fetchingAll}
                        children={<Collection items={albums} type={'album'}/>}
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

export default Album;