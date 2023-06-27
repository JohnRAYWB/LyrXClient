import styles from "@/styles/AdminTool.module.css"
import React from 'react';
import {rolesDto} from "@/api/dto/auth.dto";

const AdminTool: React.FC<rolesDto> = ({roles}) => {

    if(roles.find(role => role.role === 'admin')) {
        return (
            <main className={styles.main}>
                <p>Admin tools</p>
            </main>
        )
    }

    return null
};

export default AdminTool;