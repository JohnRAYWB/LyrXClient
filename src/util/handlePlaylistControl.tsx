import {notification} from "antd";
import styles from "@/components/Content/CollectionSelfPage/styles/CollectionHeader.module.css";
import React from "react";

export const handleAddPlaylist = (addPlaylist, playlistId) => {
    try {
        addPlaylist(playlistId)

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Playlist added successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    } catch (e) {
        console.log(e)
    }
}

export const handleRemovePlaylist = (removePlaylist, playlistId) => {
    try {
        removePlaylist(playlistId)

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