import React from 'react';

import styles from "../styles/InputFields.module.css"
import {ConfigProvider, Input} from "antd";

interface Param {
    type: string
    title: string
    setName?: Function
    setDescription?: Function
    handleRequest?: Function
    id?: number
}

const InputFields: React.FC<Param> = ({type, title, setName, setDescription, handleRequest, id}) => {

    if (type === 'create') {
        return (
            <div className={styles.inputsContainer}>
                <ConfigProvider theme={{
                    token: {
                        colorBorder: '#232323FF',
                        colorTextPlaceholder: '#404040',
                        colorPrimary: '#ff2929',
                    }
                }}>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>{title} Name</p>
                        <Input onChange={e => setName(e.target.value)} className={styles.inputField}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>{title} Description</p>
                        <Input.TextArea onChange={e => setDescription(e.target.value)}
                                        className={styles.inputField}/>
                    </div>
                </ConfigProvider>
            </div>
        );
    }

    if (type === 'add row') {
        return (
            <div className={styles.inputsContainer}>
                <ConfigProvider theme={{
                    token: {
                        colorBorder: '#232323FF',
                        colorTextPlaceholder: '#404040',
                        colorPrimary: '#ff2929',
                    }
                }}>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>{title} Name</p>
                        <Input
                            onChange={e => handleRequest(e, id)}
                            className={styles.inputField}
                        />
                    </div>
                </ConfigProvider>
            </div>
        )
    }

};

export default InputFields;