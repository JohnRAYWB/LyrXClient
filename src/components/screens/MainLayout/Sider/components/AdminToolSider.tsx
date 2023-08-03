import React from 'react';
import Link from "next/link";
import {ToolOutlined} from "@ant-design/icons";

import styles from "../styles/PlaylistSider.module.css"
import {roleDto} from "@/api/dto/user.dto";

interface RolesController {
    roles: roleDto[]
}

const AdminToolSider: React.FC<RolesController> = ({roles}) => {

    if (roles.find(role => role.role === 'admin')) {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.elem}>
                        <ToolOutlined/>
                        <Link className={styles.elemLink} href={'/pth/hub/admin'}>Admin tool</Link>
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export default AdminToolSider;