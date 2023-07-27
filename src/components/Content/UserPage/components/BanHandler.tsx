import React from 'react';
import {ConfigProvider, Input, notification} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

import styles from "../styles/User.module.css";
import {userDto} from "@/api/dto/user.dto";

interface BanParam {
    user: userDto
    setBanReason: Function
    banReason: string
    unbanFunction: Function
    banFunction: Function
    unbanLoading: boolean
    banLoading: boolean
}

const BanHandler: React.FC<BanParam> = ({user, setBanReason, banReason, unbanFunction, banFunction, unbanLoading, banLoading}) => {

    const handleUnban = () => {
        unbanFunction(user._id)

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>User unban successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    const handleBan = () => {
        banFunction({uId: user._id, reason: banReason})

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>User ban successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    }

    const handleReason = (e) => {
        setBanReason(e.target.value)
    }

    return (
        <div>
            {
                !user.ban ?
                    <>
                        {banLoading ?
                            <div className={styles.banContainer}>
                                <LoadingOutlined className={styles.loadingRed}/>
                            </div>
                            :
                            <div className={styles.banAction}>
                                <p className={styles.detailedListTitle}>Ban reason</p>
                                <ConfigProvider theme={{
                                    token: {
                                        colorBorder: '#232323FF',
                                        colorTextPlaceholder: '#404040',
                                        colorPrimary: '#ff2929',
                                    }
                                }}>
                                    <Input className={styles.commentInput}
                                           onChange={handleReason}/>
                                </ConfigProvider>
                                <p onClick={handleBan} className={styles.banButton}>Ban</p>
                            </div>
                        }
                    </>
                    :
                    <>
                        {
                            unbanLoading ?
                                <div className={styles.banContainer}>
                                    <LoadingOutlined className={styles.loadingGreen}/>
                                </div>
                                :
                                <div className={styles.banContainer}>
                                    <p onClick={handleUnban} className={styles.banButton}>Unban
                                        user</p>
                                </div>
                        }
                    </>

            }
        </div>
    );
};

export default BanHandler;