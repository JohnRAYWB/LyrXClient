import React, {useState} from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {Carousel, ConfigProvider, Tabs, TabsProps} from "antd";

import styles from "@/components/Content/GenrePage/styles/GenreSelfPage.module.css"
import TrackList from "@/components/Content/TrackPage/TrackList";
import Collection from "@/components/Content/components/Collection";
import {useFetchGenreByIdQuery} from "@/store/api/GenreApi";
import Row from "@/components/Content/components/Row";
import Element from "@/components/Content/components/Element";

interface PageParams {
    genreId: string
}

const GenrePage: NextPageWithLayout<PageParams> = ({genreId}) => {

    const [dropdownPlaylist, setDropdownPlaylist] = useState(false)
    const [dropdownAlbum, setDropdownAlbum] = useState(false)

    const {data: genre, isLoading} = useFetchGenreByIdQuery(genreId)

    if (isLoading) {
        return <></>
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'TRACKS',
            children: <TrackList tracks={genre.tracks}/>
        },
        {
            key: '2',
            label: 'PLAYLISTS',
            children: <Collection items={genre.playlists} type={'playlist'}/>
        },
        {
            key: '3',
            label: 'ALBUMS',
            children: <Collection items={genre.albums} type={'album'}/>
        },
    ]

    const {tracks, playlists, albums} = genre

    return (
        <div className={styles.container}>
            {playlists !== 0 ?
                <div className={styles.collectionsContainer}>
                    <div className={styles.collectionsTitleContainer}>
                        <h1 className={styles.collectionsContainerTitle}>{genre.name}'s Playlists</h1>
                        {playlists.length > 5 ?
                            <p className={styles.moreButton}
                               onClick={() => setDropdownPlaylist(!dropdownPlaylist)}
                            >
                                See more
                            </p>
                            :
                            null
                        }
                    </div>
                    {!dropdownPlaylist ?
                        <div className={styles.collectionsCarousel}>
                            {playlists.length > 5 ?
                                <Carousel style={{paddingBottom: 30}}>
                                    <Row items={playlists.slice(0, 5)} type={'playlist'}/>
                                    <Row items={playlists.slice(5, 10)} type={'playlist'}/>
                                </Carousel>
                                :
                                <Row items={playlists} type={'playlist'}/>
                            }
                        </div>
                        :
                        <div className={styles.collectionsDropDown}>
                            {playlists.map(playlist =>
                                <Element item={playlist} type={'playlist'}/>
                            )}
                        </div>
                    }
                </div>
                :
                null
            }
            {albums !== 0 ?
                <div className={styles.collectionsContainer}>
                    <div className={styles.collectionsTitleContainer}>
                        <h1 className={styles.collectionsContainerTitle}>{genre.name}'s Albums</h1>
                        {albums.length > 5 ?
                            <p className={styles.moreButton}
                               onClick={() => setDropdownAlbum(!dropdownAlbum)}
                            >
                                See more
                            </p>
                            :
                            null
                        }
                    </div>
                    {!dropdownAlbum ?
                        <div className={styles.collectionsCarousel}>
                            {albums.length > 5 ?
                                <Carousel style={{paddingBottom: 30}}>
                                    <Row items={albums.slice(0, 5)} type={'album'}/>
                                    <Row items={albums.slice(5, 10)} type={'album'}/>
                                </Carousel>
                                :
                                <Row items={albums} type={'album'}/>
                            }
                        </div>
                        :
                        <div className={styles.collectionsDropDown}>
                            {albums.map(album =>
                                <Element item={album} type={'album'}/>
                            )}
                        </div>
                    }
                </div>
                :
                null
            }
            {tracks !== 0 ?
                <div className={styles.tracksMainContainer}>
                    <div className={styles.collectionsTitleContainer}>
                        <h1 className={styles.collectionsContainerTitle}>{genre.name}'s Tracks</h1>
                    </div>
                    <div className={styles.tracksContainer}>
                        <TrackList tracks={tracks}/>
                    </div>
                </div>
                :
                null
            }
            {/*<ConfigProvider theme={{
                    token: {
                        colorPrimary: "#F64141",
                        colorBorderSecondary: "#343434",
                    }
                }}>
                    <Tabs
                        centered
                        defaultActiveKey={'1'}
                        items={items}
                        tabBarStyle={{color: '#888888'}}
                    />
                </ConfigProvider>*/}
        </div>
    );
};

GenrePage.getLayout = (page: React.ReactNode) => <MainLayout name={'Genre Page'}>{page}</MainLayout>

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

        return {
            props: {
                genreId: ctx.params.id
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default GenrePage;