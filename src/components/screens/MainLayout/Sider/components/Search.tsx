import React from 'react';
import styles from "@/components/screens/MainLayout/Sider/styles/MainSider.module.css";
import {SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";

function Search (props) {

    return (
        <div className={styles.containerRow}>
            <SearchOutlined/>
            <Input
                className={styles.rowInput}
                bordered={false}
                placeholder={'Search'}
                onChange={props.onChange}
            />
        </div>
    );
};

export default Search