import {MenuProps} from "antd";
import {
    AppstoreOutlined,
    BorderOuterOutlined,
    TagsOutlined,
    UngroupOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";
import React from "react";

export const userItems: MenuProps['items'] = [
    {
        label: 'User controller',
        key: 'SubMenu',
        style: {fontSize: 16, width: 280},
        icon: <UserSwitchOutlined style={{fontSize: 16, marginRight: 10}}/>,
        children: [
            {
                style: {fontSize: 14},
                label: 'Get all users',
                key: 'option:1',
            },
            {
                style: {fontSize: 14},
                label: 'Add | remove role',
                key: 'option:2',
            },
            {
                style: {fontSize: 14},
                label: 'Add | remove ban',
                key: 'option:3',
            }
        ],
    },
];

export const genreItems: MenuProps['items'] = [
    {
        label: 'Genre controller',
        key: 'SubMenu',
        style: {fontSize: 16, width: 280},
        icon: <TagsOutlined style={{fontSize: 16, marginRight: 10}}/>,
        children: [
            {
                style: {fontSize: 14},
                label: 'Add genre',
                key: 'option:1',
            },
            {
                style: {fontSize: 14},
                label: 'Delete role',
                key: 'option:2',
            },
        ],
    },
];

export const trackItems: MenuProps['items'] = [
    {
        label: 'Track controller',
        key: 'SubMenu',
        style: {fontSize: 16, width: 280},
        icon: <BorderOuterOutlined style={{fontSize: 16, marginRight: 10}}/>,
        children: [
            {
                style: {fontSize: 14},
                label: 'Edit track artist',
                key: 'option:1',
            },
            {
                style: {fontSize: 14},
                label: 'Delete track',
                key: 'option:3',
            }
        ],
    },
];

export const playlistItems: MenuProps['items'] = [
    {
        label: 'Playlist controller',
        key: 'SubMenu',
        style: {fontSize: 16, width: 280},
        icon: <AppstoreOutlined rotate={45} style={{fontSize: 16, marginRight: 10}}/>,
        children: [
            {
                style: {fontSize: 14},
                label: 'Delete playlist',
                key: 'option:2',
            }
        ],
    },
];

export const albumItems: MenuProps['items'] = [
    {
        label: 'Album controller',
        key: 'SubMenu',
        style: {fontSize: 16, width: 280},
        icon: <UngroupOutlined rotate={90} style={{fontSize: 16, marginRight: 10}}/>,
        children: [
            {
                style: {fontSize: 14},
                label: 'Add | remove track',
                key: 'option:1',
            },
            {
                style: {fontSize: 14},
                label: 'Delete playlist',
                key: 'option:2',
            }
        ],
    },
];