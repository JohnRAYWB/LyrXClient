import React, {useState} from 'react';
import styles from '@/styles/HubSideBar.module.css'
import Link from "next/link";
import {HomeFilled, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {ConfigProvider, Input, Menu, MenuProps} from "antd";
import * as Api from "@/api"

const onClickLogout = () => {
    if (window.confirm("Are you sure to logout?")) {
        Api.auth.logout();
        location.href = "/";
    }
};

const items: MenuProps['items'] = [
    {
        label: 'Profile',
        key: 'SubMenu',
        style: {fontSize: 16},
        icon: <UserOutlined style={{fontSize: 16}}/>,
        children: [
            {
                label: 'Option 1',
                key: 'setting:1',
            },
            {
                label: (
                    <button className={styles.logoutButton} onClick={onClickLogout}>Logout</button>
                ),
                key: 'setting:1',
            }
        ],
    },
    /*{
        label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
        ),
        key: 'alipay',
    },*/
];

const HubHeader: React.FC = () => {

    const [current, setCurrent] = useState('')

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
                            hover: '#F64141',
                            colorFill: '#F64141'
                        }
                    }}>
                        <Menu mode={'inline'} selectedKeys={[current]} items={items}/>
                    </ConfigProvider>
                </div>
            </div>
        </main>
    );
};

export default HubHeader;