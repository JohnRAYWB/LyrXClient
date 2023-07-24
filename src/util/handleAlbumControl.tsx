import {notification} from "antd";
import styles from "@/components/Content/CollectionSelfPage/styles/CollectionHeader.module.css";
import React from "react";

export const handleAddAlbum = (addAlbum, albumId) => {
    try {
        addAlbum(albumId)

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Album added successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    } catch (e) {
        console.log(e)
    }
}

export const handleRemoveAlbum = (removeAlbum, albumId) => {
    try {
        removeAlbum(albumId)

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Playlist removed successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    } catch (e) {
        console.log(e)
    }
}