import React from 'react';
import {LoadingOutlined} from "@ant-design/icons";
import {notification} from "antd";

import styles from "../styles/User.module.css";
import {userDto} from "@/api/dto/user.dto";

interface RoleParams {
    user: userDto
    incomingRole: string
    addFunction: Function
    removeFunction: Function
    addLoading: boolean
    removeLoading: boolean
}

const RoleHandler: React.FC<RoleParams> = ({user, incomingRole, addFunction, removeFunction, addLoading, removeLoading}) => {

    const handleAddRole = () => {
        addFunction({uId: user._id, role: incomingRole})

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Role added successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    const handleRemoveRole = () => {
        removeFunction({uId: user._id, role: incomingRole})

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Role removed successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    return (
        <div>
            {user.roles.findIndex(role => role.role === incomingRole) !== -1 ?
                <>
                    {removeLoading ?
                        <div className={styles.loadingContainer}>
                            <LoadingOutlined className={styles.loadingRed}/>
                        </div>
                        :
                        <p onClick={() => handleRemoveRole()}
                           className={styles.roleEntityRemove}>
                            Remove {incomingRole} role
                        </p>
                    }
                </>
                :
                <>
                    {addLoading ?
                        <div className={styles.loadingContainer}>
                            <LoadingOutlined className={styles.loadingGreen}/>
                        </div>
                        :
                        <p onClick={() => handleAddRole()}
                           className={styles.roleEntityAdd}>
                            Add {incomingRole} role
                        </p>
                    }
                </>
            }
        </div>
    );
};

export default RoleHandler;