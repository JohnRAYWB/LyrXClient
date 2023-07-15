import React from 'react';
import {ConfigProvider, Tabs, TabsProps} from "antd";
import TrackList from "@/components/Content/TrackPage/TrackList";
import Collection from "@/components/Content/components/Collection";
import Pagination from "@/util/pagination";

import {genre} from "@/api/dto/genre.entity";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'TRACKS',
        children: []
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


const GenrePage: NextPageWithLayout = () => {

    return (
        <div>
            {/*<div>
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
            </div>*/}
            <Pagination link={'http://localhost:4221/tracks?limit=1&page='} num={0}/>
        </div>
    );
};

GenrePage.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Genre Page'}>{page}</MainLayout>
}
export default GenrePage;