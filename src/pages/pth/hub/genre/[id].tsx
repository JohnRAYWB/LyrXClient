import React from 'react';
import {ConfigProvider, Tabs, TabsProps} from "antd";
import TrackList from "@/components/Content/TrackPage/TrackList";
import Collection from "@/components/Content/components/Collection";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useFetchByIdQuery} from "@/store/api/GenreApi";

interface PageParams {
    genreId: string
}

const GenrePage: NextPageWithLayout<PageParams> = ({genreId}) => {

    const {data: genre, isLoading} = useFetchByIdQuery(genreId)

    if(isLoading) {
        return <></>
    }
    console.log(genre)
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

    return (
        <div>
            <div>
                <ConfigProvider theme={{
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
                </ConfigProvider>
            </div>
        </div>
    );
};

GenrePage.getLayout = (page: React.ReactNode) => <MainLayout name={'Genre Page'}>{page}</MainLayout>

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