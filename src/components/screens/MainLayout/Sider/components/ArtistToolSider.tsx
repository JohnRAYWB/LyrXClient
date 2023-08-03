import React from 'react';
import Link from "next/link";
import {
    DeleteOutlined, EditOutlined, PlusSquareOutlined,
    RightOutlined,
    ToolOutlined,
} from "@ant-design/icons";

import styles from "../styles/ToolSider.module.css"
import {roleDto} from "@/api/dto/user.dto";
import {useRouter} from "next/navigation";

interface RolesController {
    roles: roleDto[]
}

const ArtistToolSider: React.FC<RolesController> = ({roles}) => {

    const router = useRouter()

    if(roles.find(role => role.role === 'artist')) {
        return (
            <div className={styles.main}>
                <div className={styles.titleContainer}>
                    <ToolOutlined className={styles.titleIcon}/>
                    <button onClick={() => router.push('/pth/hub/artist')} className={styles.titleButton}>Artist tool</button>
                </div>
                <div className={styles.container}>
                    <div className={styles.containerRow}>
                        <div className={styles.rowElement}>
                            <PlusSquareOutlined/>
                            <p className={styles.rowIcon}>Add Track</p>
                        </div>
                        <Link href={'/pth/hub/artist/add_track'}><RightOutlined className={styles.rowAdd}/></Link>
                    </div>
                    <div className={styles.containerRow}>
                        <div className={styles.rowElement}>
                            <PlusSquareOutlined/>
                            <p className={styles.rowIcon}>Add Album</p>
                        </div>
                        <Link href={'/pth/hub/artist/add_album'}><RightOutlined className={styles.rowAdd}/></Link>
                    </div>
                    <div className={styles.containerRow}>
                        <div className={styles.rowElement}>
                            <EditOutlined/>
                            <p className={styles.rowIcon}>Edit Track</p>
                        </div>
                        <Link href={'/pth/hub/artist/edit_track'}><RightOutlined className={styles.rowAdd}/></Link>
                    </div>
                    <div className={styles.containerRow}>
                        <div className={styles.rowElement}>
                            <EditOutlined/>
                            <p className={styles.rowIcon}>Edit Album</p>
                        </div>
                        <Link href={'/pth/hub/artist/edit_album'}><RightOutlined className={styles.rowAdd}/></Link>
                    </div>
                    <div className={styles.containerRow}>
                        <div className={styles.rowElement}>
                            <DeleteOutlined/>
                            <p className={styles.rowIcon}>Delete track | album</p>
                        </div>
                        <Link href={'/pth/hub/artist/delete'}><RightOutlined className={styles.rowAdd}/></Link>
                    </div>
                </div>
            </div>
        );
    }

    return null
};

export default ArtistToolSider