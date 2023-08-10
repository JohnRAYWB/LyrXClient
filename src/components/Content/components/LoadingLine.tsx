import React from 'react';
import {LoadingOutlined} from "@ant-design/icons";

import styles from "./styles/Loading.module.css"

const LoadingLine = () => {
    return (
        <div className={styles.loadingContainer}>
            <p className={styles.loadingTitle}>Processing</p>
            <LoadingOutlined className={styles.loadingSpinner}/>
        </div>
    );
};

export default LoadingLine;