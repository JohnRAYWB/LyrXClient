import React, {useState} from 'react';
import MenuSider from "./MenuSider";
import {albumItems, genreItems, playlistItems, trackItems, userItems} from "./MenuItems/AdminItems";
import styles from "../styles/ToolSider.module.css"
import {roleDto} from "@/api/dto/auth.dto";
import {ToolOutlined} from "@ant-design/icons";

const AdminToolSider: React.FC<roleDto> = ({roles}) => {

    const [current, setCurrent] = useState('')

    if(roles.find(role => role.role === 'admin')) {
        return (
            <div className={styles.main}>
                <div className={styles.title}>
                    <ToolOutlined className={styles.titleIcon}/>
                    Admin tool
                </div>
                <div>
                    <MenuSider items={userItems}/>
                    <MenuSider items={genreItems}/>
                    <MenuSider items={trackItems}/>
                    <MenuSider items={playlistItems}/>
                    <MenuSider items={albumItems}/>
                </div>
            </div>
        )
    }

    return null
};

export default AdminToolSider;