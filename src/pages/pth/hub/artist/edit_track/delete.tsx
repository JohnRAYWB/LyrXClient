import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {
    useFetchArtistSinglesAndSearchQuery,
} from "@/store/api/TrackApi";
import Search from "@/components/screens/MainLayout/Sider/components/Search";
import styles from "@/components/Content/ArtistTools/styles/EditArtistEntitiesTool.module.css";
import {LoadingOutlined} from "@ant-design/icons";
import EditArtistEntitiesTool from "@/components/Content/ArtistTools/EditArtistEntitiesTool";

const Delete: NextPageWithLayout = () => {

    const [query, setQuery] = useState('')

    const {data: user, isLoading: userLoading} = useFetchProfileQuery()
    const {data: tracks, isLoading: tracksLoading, isFetching: tracksFetch} = useFetchArtistSinglesAndSearchQuery(query)

    if(userLoading || tracksLoading) {
        return <></>
    }

    if(user.roles.findIndex(role => role.role === 'artist') === -1) {
        return <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
    }

    const searchHandle = (e) => {
        setQuery(e.target.value)
    }

    return (
        <MainLayout name={'Delete Track'} searchElement={<Search onChange={searchHandle}/>}>
            {tracksFetch ?
                    <div className={styles.emptyListContainer}>
                        <p className={styles.emptyList}>Searching track</p>
                        <LoadingOutlined className={styles.emptyList}/>
                    </div>
                    :
                    <EditArtistEntitiesTool type={'track'} action={'delete'} entities={tracks}/>
            }
        </MainLayout>
    );
};

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

    } catch (e) {
        console.log(e)
    }
})

export default Delete;