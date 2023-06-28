import React from 'react';
import {MenuProps} from "antd";
import {UserOutlined} from "@ant-design/icons";
import styles from "../screens/MainLayout/Sider/styles/MainSider.module.css";
import {onClickLogout} from "@/hook/userHandlers";

export const profileItems: MenuProps['items'] = [
    {
        label: 'Profile',
        key: 'SubMenu',
        style: {fontSize: 16, width: 280},
        icon: <UserOutlined style={{fontSize: 16, marginRight: 10}}/>,
        children: [
            {
                style: {fontSize: 14},
                label: 'Open profile',
                key: 'option:1',
            },
            {
                style: {fontSize: 14},
                label: 'Your collection',
                key: 'option:2',
            },
            {
                label: (
                    <button className={styles.dropDownLogout} onClick={onClickLogout}>Logout</button>
                ),
                key: 'option:3',
            }
        ],
    },
];