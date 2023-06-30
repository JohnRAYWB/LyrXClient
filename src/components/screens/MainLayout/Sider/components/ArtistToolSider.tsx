import React from 'react';
import Link from "next/link";
import {BorderOuterOutlined, PlusOutlined, ToolOutlined, UngroupOutlined} from "@ant-design/icons";
import {rolesDto} from "@/api/dto/auth.dto";
import styles from "../styles/ToolSider.module.css"

const ArtistToolSider: React.FC<rolesDto> = ({roles}) => {

    if(roles.find(role => role.role === 'artist')) {
        return (
            <div className={styles.main}>
                <div className={styles.title}>
                    <ToolOutlined className={styles.titleIcon}/>
                    Artist tool
                </div>
                <div className={styles.container}>
                    <div className={styles.containerRow}>
                        <div className={styles.rowElement}>
                            <BorderOuterOutlined rotate={45}/>
                            <p className={styles.rowIcon}>Add track | album</p>
                        </div>
                        <Link href={'/'}><PlusOutlined className={styles.rowAdd}/></Link>

                    </div>
                    <div className={styles.containerRow}>
                        <div className={styles.rowElement}>
                            <UngroupOutlined rotate={90}/>
                            <p className={styles.rowIcon}>Edit track | album</p>
                        </div>
                        <Link href={'/'}><PlusOutlined className={styles.rowAdd}/></Link>
                    </div>
                    <div className={styles.containerRow}>
                        <div className={styles.rowElement}>
                            <UngroupOutlined rotate={90}/>
                            <p className={styles.rowIcon}>Delete track | album</p>
                        </div>
                        <Link href={'/'}><PlusOutlined className={styles.rowAdd}/></Link>
                    </div>
                </div>
            </div>
        );
    }

    return null
};

export default ArtistToolSider