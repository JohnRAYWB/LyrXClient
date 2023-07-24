import {notification} from "antd";
import styles from "@/styles/TrackPage.module.css";
import React from "react";

export const handleAddTrack = (addTrack, trackId) => {
    try {
        addTrack(trackId)

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Track added successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })

    } catch (e) {
        console.log(e)
    }
}

export const handleRemoveTrack = (removeTrack, trackId) => {
    try {
        removeTrack(trackId)

        notification.success({
            style: {backgroundColor: "#646464", width: 300},
            message: <p className={styles.notification}>Done!</p>,
            description: <p className={styles.notification}>Track removed successfully</p>,
            placement: "bottomLeft",
            duration: 2
        })
    } catch (e) {
        console.log(e)
    }
}