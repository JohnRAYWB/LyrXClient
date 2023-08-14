import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {LoadingOutlined} from "@ant-design/icons";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import styles from "@/components/Content/ArtistTools/styles/EditArtistEntitiesTool.module.css"
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import Pagination from "@/util/Pagination";
import EditArtistEntitiesTool from "@/components/Content/ArtistTools/EditArtistEntitiesTool";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {useFetchArtistsTracksAndSearchQuery, useFetchArtistsTracksQuery} from "@/store/api/TrackApi";

const EditTrack: NextPageWithLayout = () => {

    const [query, setQuery] = useState(null)
    const [page, setPage] = useState(0)

    const {data: user, isLoading: userLoading} = useFetchProfileQuery()
    const {data: pagTracks, isLoading: pagLoading, isFetching: pagFetch} = useFetchArtistsTracksQuery(page)
    const {
        data: searchTracks,
        isLoading: searchLoading,
        isFetching: searchFetch
    } = useFetchArtistsTracksAndSearchQuery(query)

    if (userLoading || pagLoading || searchLoading) {
        return <></>
    }

    if (user.roles.findIndex(role => role.role === 'artist') === -1) {
        return <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Edit Tracks'} searchElement={<Search onChange={searchHandle}/>}>
            {query ?
                searchFetch ?
                    <div className={styles.emptyListContainer}>
                        <p className={styles.emptyList}>Searching track</p>
                        <LoadingOutlined className={styles.emptyList}/>
                    </div>
                    :
                    <EditArtistEntitiesTool type={'track'} action={'edit'} entities={searchTracks}/>
                :
                <Pagination
                    page={page}
                    setPage={setPage}
                    isFetching={pagFetch}
                    children={<EditArtistEntitiesTool type={'track'} action={'edit'} entities={pagTracks}/>}
                />
            }
        </MainLayout>
    )
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

export default EditTrack;