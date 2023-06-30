import React, {useEffect, useState} from 'react';
import styles from "./Navigation.module.css"
import Link from "next/link";
import {useRouter, usePathname} from "next/navigation";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

interface HeaderName {
    name: string
}

const Navigation: React.FC<HeaderName> = ({name}) => {

    const router = useRouter()
    const pathName = usePathname()

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.navButtons}>
                    {pathName !== '/pth/hub' ?
                        (<button className={styles.navButton} onClick={() => router.back()}>
                            <LeftOutlined className={styles.buttonIcon}/>
                        </button>)
                        :
                        <LeftOutlined className={styles.disabledButtonIcon}/>}
                    <button className={styles.navButton} onClick={() => router.forward()}><RightOutlined className={styles.buttonIcon}/></button>
                </div>
                <div className={styles.linksContainer}>
                    <Link href={'/pth/hub/playlist'}><p className={styles.link}>Playlists</p></Link>
                    <Link href={'/pth/hub/album'}><p className={styles.link}>Albums</p></Link>
                </div>
                    <p className={styles.navName}>{name}</p>
            </div>
        </div>
    );
};

export default Navigation;