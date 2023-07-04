import React from 'react';
import styles from "@/components/screens/MainLayout/Sider/styles/PlaylistSider.module.css";
import {BoxPlotFilled} from "@ant-design/icons";
import Link from "next/link";

const Genre = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.elem}>
                    <BoxPlotFilled rotate={180}/>
                    <Link className={styles.elemLink} href={'/pth/hub/genre'}>Genres</Link>
                </div>
            </div>
        </div>
    );
};

export default Genre;