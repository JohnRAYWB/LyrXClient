import React from 'react';
import styles from "./Navigation.module.css"
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
                    <button className={styles.navButton} onClick={() => router.forward()}><RightOutlined
                        className={styles.buttonIcon}/></button>
                </div>
                <p className={styles.navName}>{`${name} | LyrX` || 'LyrX'}</p>
            </div>
        </div>
    );
};

export default Navigation;