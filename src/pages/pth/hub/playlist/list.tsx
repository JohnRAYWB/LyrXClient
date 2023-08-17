import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import styles from "@/components/Content/PlaylistTool/styles/UsersPlaylists.module.css"
import {useFetchUsersPlaylistsQuery} from "@/store/api/PlaylistApi";
import {useFetchProfileQuery} from "@/store/api/UserApi";
import {playlistDto} from "@/api/dto/playlist.dto";
import PlaylistHeader from "@/components/Content/PlaylistTool/components/PlaylistHeader";
import Image from "next/image";
import {playlistImagePath} from "@/util/ImagePath";
import useTextLength from "@/util/useTextLength";

const UsersPlaylists: NextPageWithLayout = () => {

    const [mainPlaylist, setMainPlaylist] = useState<playlistDto>(null)

    const {data: playlists, isLoading: playlistsLoading} = useFetchUsersPlaylistsQuery()
    const {data: user, isLoading: userLoading} = useFetchProfileQuery()

    if (playlistsLoading || userLoading) {
        return <></>
    }

    const [lastAdded] = playlists.slice(-1)

    return (
        <div className={styles.container}>
            {mainPlaylist && mainPlaylist._id !== lastAdded._id ?
                <h1 className={styles.title}>Current playlist</h1>
                :
                <h1 className={styles.title}>Last added playlist</h1>
            }
            <PlaylistHeader playlist={mainPlaylist ? mainPlaylist : lastAdded} user={user}/>
            {playlists ?
                <div className={styles.collectionList}>
                    <h1 className={styles.title}>Other your playlist</h1>
                    <div className={styles.playlistsContainer}>
                        {playlists.map(playlist =>
                            <div key={playlist._id} onClick={() => setMainPlaylist(playlist)}>
                                <div className={mainPlaylist && mainPlaylist._id === playlist._id ?
                                    styles.activePlaylistContainer
                                    :
                                    styles.playlistContainer}>
                                    <Image
                                        className={styles.playlistImage}
                                        width={100}
                                        height={100}
                                        priority={true}
                                        src={playlistImagePath(playlist)}
                                        alt={'playlist_logo'}
                                    />
                                    <p className={styles.playlistName}>{useTextLength(playlist.name[1], 10)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                :
                <h1 className={styles.title}>You don't have own playlists yet</h1>
            }
            {user.playlistsCollection ?
                <div className={styles.collectionList}>
                    <h1 className={styles.title}>Your favorites</h1>
                    <div className={styles.playlistsContainer}>
                        {user.playlistsCollection.map(playlist =>
                            <div key={playlist._id} onClick={() => setMainPlaylist(playlist)}>
                                <div className={mainPlaylist && mainPlaylist._id === playlist._id ?
                                    styles.activePlaylistContainer
                                    :
                                    styles.playlistContainer}>
                                    <Image
                                        className={styles.playlistImage}
                                        width={100}
                                        height={100}
                                        priority={true}
                                        src={playlistImagePath(playlist)}
                                        alt={'playlist_logo'}
                                    />
                                    <p className={styles.playlistName}>{useTextLength(playlist.name[1], 10)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                :
                <h1 className={styles.title}>You don't have favorites playlists yet</h1>
            }
        </div>
    );
};

UsersPlaylists.getLayout = (page: React.ReactNode) => <MainLayout name={'Your Playlists'}>{page}</MainLayout>

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

export default UsersPlaylists;