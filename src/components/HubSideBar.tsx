import React, {useState} from 'react';
import styles from '@/styles/HubSideBar.module.css'
import Link from "next/link";
import {HomeFilled, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {ConfigProvider, Input, Menu, MenuProps} from "antd";
import PlayerSideBar from "@/components/PlayerSideBar";
import {getUserProps, getPlaylistsCollection, onClickLogout} from "@/hook/userHandlers";
import AdminTool from "@/components/AdminTool";

const userAbstract = {
    "_id": "648bf0189ad4746a044fa376",
    "email": "john@gmail.com",
    "username": "john",
    "banReason": [],
    "followers": [
    {
        "_id": "648bf1eeb3f515230b3fc72f",
        "email": "maximum_black@gmail.com",
        "password": "$2b$10$OMExZhiJE2h.bFKBeljskeninCDhy94DcE7JXmm07qA.1bJc3YPvu",
        "username": "maslo",
        "banReason": [
            "Darker then black"
        ],
        "followers": [],
        "followings": [
            "648bf0189ad4746a044fa376"
        ],
        "roles": [
            "648beedc701c86c3f691d2d2",
            "648bef0f701c86c3f691d2d9"
        ],
        "comments": [],
        "tracks": [
            "648ff677d7e91038c34b4270",
            "648ff677d7e91038c34b4272",
            "648ff677d7e91038c34b4271"
        ],
        "tracksCollection": [],
        "playlists": [],
        "playlistsCollection": [],
        "albums": [],
        "albumsCollection": [],
        "__v": 0,
        "about": "darker then black",
        "avatar": "image/bf26f43c-0e4e-47df-9070-e28468b6f7eb.jpg",
        "birth": "1992-09-21T00:00:00.000Z",
        "ban": false
    }
],
    "followings": [],
    "roles": [
    {
        "_id": "648beec4701c86c3f691d2cf",
        "role": "admin",
        "description": "boss of the gym",
        "__v": 0
    },
    {
        "_id": "648beedc701c86c3f691d2d2",
        "role": "user",
        "description": "pendejo",
        "__v": 0
    },
    {
        "_id": "648beef7701c86c3f691d2d6",
        "role": "tester",
        "description": "boi",
        "__v": 0
    },
    {
        "_id": "648bef0f701c86c3f691d2d9",
        "role": "artist",
        "description": "can add own music",
        "__v": 0
    }
],
    "comments": [],
    "tracks": [],
    "tracksCollection": [],
    "playlists": [
    {
        "_id": "64995b5360d0a9014db1258d",
        "name": "Maslo",
        "image": "image/e705b503-7aa3-4d3d-8754-04887adb7551.jpg",
        "favorites": 0,
        "user": "648bf0189ad4746a044fa376",
        "genre": [],
        "tracks": [],
        "__v": 0
    }
],
    "playlistsCollection": [],
    "albums": [],
    "albumsCollection": [],
    "__v": 0,
    "about": "first papa",
    "avatar": "image/4b7f4543-d03d-4e8f-bf62-bc000f64f2d8.jpg",
    "birth": "1994-05-26T00:00:00.000Z"
}

const items: MenuProps['items'] = [
    {
        label: 'Profile',
        key: 'SubMenu',
        style: {fontSize: 16},
        icon: <UserOutlined style={{fontSize: 16, marginRight: 10}}/>,
        children: [
            {
                label: 'Open profile',
                key: 'option:1',
            },
            {
                label: 'Your collection',
                key: 'option:2',
            },
            {
                label: (
                    <button className={styles.logoutButton} onClick={onClickLogout}>Logout</button>
                ),
                key: 'option:3',
            }
        ],
    },
];

const HubHeader: React.FC = () => {

    const [current, setCurrent] = useState('')

    /*const user = getUserProps()
    const playlists = getPlaylistsCollection()*/

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.sideBarTop}>
                    <HomeFilled/>
                    <Link className={styles.sideBarTopElem} href={'/pth/hub'}>Home</Link>
                </div>
                <div className={styles.sideBarTop}>
                    <SearchOutlined/>
                    <Input
                        className={styles.input}
                        bordered={false}
                        placeholder={'Search'}
                    />
                </div>
            </div>
            <div className={styles.dropDown}>
                <div>
                    <ConfigProvider theme={{
                        token: {
                            colorBgContainer: 'inherit',
                            colorSplit: 'inherit',
                            colorText: 'white',
                            controlItemBgActive: '#F64141',
                            motionDurationSlow: '100ms',
                            margin: 20
                        }
                    }}>
                        <Menu mode={'inline'} selectedKeys={[current]} items={items}/>
                    </ConfigProvider>
                </div>
            </div>
            <div>
                <PlayerSideBar playlists={userAbstract.playlistsCollection}/>
            </div>
            <div>
                <AdminTool roles={userAbstract.roles}/>
            </div>
        </main>
    );
};

export default HubHeader;