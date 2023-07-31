import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";

import MainLayout from "@/components/screens/MainLayout/MainLayout";
import styles from "@/styles/Genre.module.css"
import {useCreateGenreMutation, useFetchAllGenreQuery} from "@/store/api/GenreApi";
import {notification} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const Genre: NextPageWithLayout = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const {data: genres, isLoading} = useFetchAllGenreQuery()
    const [createGenre, {isLoading: addLoading, isSuccess}] = useCreateGenreMutation()

    if (isLoading) {
        return <></>
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleCreateGenre = () => {

        if (genres.findIndex(genre => genre.name === name) !== -1) {
            return notification.error({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Error!</p>,
                description: <p className={styles.notification}>Genre {name} is exist already</p>,
                placement: "bottomLeft",
                duration: 2
            })
        }

        if (name !== '' && description !== '') {
            createGenre({name: name, description: description})

            if (isSuccess) {
                return notification.success({
                    style: {backgroundColor: "#646464", width: 300},
                    message: <p className={styles.notification}>Done!</p>,
                    description: <p className={styles.notification}>Genre add successfully</p>,
                    placement: "bottomLeft",
                    duration: 2
                })
            }
        } else {
            return notification.error({
                style: {backgroundColor: "#646464", width: 300},
                message: <p className={styles.notification}>Error!</p>,
                description: <p className={styles.notification}>Name or description is empty</p>,
                placement: "bottomLeft",
                duration: 2
            })
        }
    }

    return (
        <div>
            <div className={styles.addGenreContainer}>
                <div className={styles.addGenreInputContainer}>
                    <p className={styles.addGenreInputTitle}>Name</p>
                    <input className={styles.addGenreInput} onChange={handleName} placeholder={'Input genre name'}/>
                </div>
                <div className={styles.addGenreInputContainer}>
                    <p className={styles.addGenreInputTitle}>Description</p>
                    <input className={styles.addGenreInput} onChange={handleDescription} placeholder={'Input genre description'}/>
                </div>
            </div>
            {addLoading ?
                <div className={styles.loadingDeleteContainer}>
                    <LoadingOutlined className={styles.loadingGreen}/>
                </div>
            :
                <button className={styles.addGenreButton} onClick={handleCreateGenre}>Complete</button>
            }
        </div>
    );
};

Genre.getLayout = (page: React.ReactNode) => <MainLayout name={'Add Genre'}>{page}</MainLayout>

export default Genre;