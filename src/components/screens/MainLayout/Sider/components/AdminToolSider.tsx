import React from 'react';
import styles from "../styles/PlaylistSider.module.css"
import {roleDto} from "@/api/dto/user.dto";
import {ToolOutlined} from "@ant-design/icons";
import Link from "next/link";

interface RolesController {
    roles: roleDto[]
}

const AdminToolSider: React.FC<RolesController> = ({roles}) => {

    if (roles.find(role => role.role === 'admin')) {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.elem}>
                        <ToolOutlined className={styles.titleIcon}/>
                        <Link className={styles.elemLink} href={'/pth/hub/admin'}>Admin tool</Link>
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export default AdminToolSider;