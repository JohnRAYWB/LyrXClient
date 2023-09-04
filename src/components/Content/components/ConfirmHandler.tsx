import React from 'react';

import styles from "./styles/ConfirmHandler.module.css"

interface Param {
    confirm: boolean
    setConfirm: Function
    handleUpload: Function
    type?: string
}

const ConfirmHandler: React.FC<Param> = ({confirm,setConfirm, handleUpload, type}) => {

    return (
        <div className={styles.confirmMainContainer}>
            {confirm ?
                <div className={styles.confirmContainer}>
                    <p className={styles.confirmTitle}>Confirm ?</p>
                    <p className={styles.confirmChoiceButtonYes} onClick={() => handleUpload()}>Yes</p>
                    <p className={styles.confirmChoiceButtonNo}
                       onClick={() => setConfirm(!confirm)}>No</p>
                </div>
                :
                <p className={styles.confirmButton} onClick={() => setConfirm(!confirm)}>{type !== 'delete' ? 'Complete' : 'Delete'}</p>
            }
        </div>
    );
};

export default ConfirmHandler;