import React from 'react';
import {MenuProps} from "antd";
import {UserOutlined} from "@ant-design/icons";
import styles from "../../styles/MainSider.module.css";
import {onClickLogout} from "@/hook/userHandlers";
import Link from "next/link";

export const profileItems: MenuProps['items'] = [
    {
        label: 'Profile',
        key: 'SubMenu',
        style: {fontSize: 16, width: 280},
        icon: <UserOutlined style={{fontSize: 16, marginRight: 10}}/>,
        children: [
            {
                style: {fontSize: 14},
                label: <Link href={'/pth/hub/profile'}>Open profile</Link>,
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