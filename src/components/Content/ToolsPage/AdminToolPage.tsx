import React from 'react';

import styles from "./styles/ToolsPage.module.css"
import AdminHeader from "@/components/Content/ToolsPage/components/AdminHeader";

const AdminToolPage = () => {

    return (
        <div className={styles.container}>
            <div>
                <AdminHeader/>
            </div>
        </div>
    );
};

export default AdminToolPage;