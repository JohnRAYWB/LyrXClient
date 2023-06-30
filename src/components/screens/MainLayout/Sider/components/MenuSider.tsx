import React, {useState} from 'react';
import styles from "../styles/MenuSider.module.css";
import {ConfigProvider, Menu, MenuProps} from "antd";

interface menuItems {
    items: MenuProps["items"]
}

const MenuSider: React.FC<menuItems> = ({items}) => {

    const [current, setCurrent] = useState('')

    return (
            <div className={styles.main}>
                <div>
                    <ConfigProvider theme={{
                        token: {
                            colorBgContainer: 'inherit',
                            colorSplit: 'inherit',
                            colorText: 'white',
                            controlItemBgActive: '#F64141',
                            motionDurationSlow: '100ms',
                            margin: 20,
                        }
                    }}>
                        <Menu mode={'inline'} selectedKeys={[current]} items={items}/>
                    </ConfigProvider>
                </div>
            </div>
    );
};

export default MenuSider;