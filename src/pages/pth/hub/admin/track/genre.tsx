import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {notification} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

import styles from "@/styles/Genre.module.css"
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {useAppSelector} from "@/hook/redux";
import {selectUserData} from "@/store/slice/user";
import {useCreateGenreMutation, useFetchAllGenreQuery} from "@/store/api/GenreApi";

const Genre: NextPageWithLayout = () => {

    const [name, setName] = useState('')
    const user = useAppSelector(selectUserData)
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
            {user.roles.findIndex(role => role.role === 'admin') === -1 ?
                <p style={{textAlign: "center", fontSize: 44, color: '#999999'}}>Access denied</p>
                :
                <>
                    <div className={styles.addGenreContainer}>
                        <div className={styles.addGenreInputContainer}>
                            <p className={styles.addGenreInputTitle}>Name</p>
                            <input className={styles.addGenreInput} onChange={handleName} placeholder={'Input genre name'}/>
                        </div>
                        <div className={styles.addGenreInputContainer}>
                            <p className={styles.addGenreInputTitle}>Description</p>
                            <input className={styles.addGenreInput} onChange={handleDescription}
                                   placeholder={'Input genre description'}/>
                        </div>
                    </div>
                    {addLoading ?
                        <div className={styles.loadingDeleteContainer}>
                            <LoadingOutlined className={styles.loadingGreen}/>
                        </div>
                        :
                        <button className={styles.addGenreButton} onClick={handleCreateGenre}>Complete</button>
                    }
                </>
            }
        </div>
    );
};

Genre.getLayout = (page: React.ReactNode) => <MainLayout name={'Add Genre'}>{page}</MainLayout>

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if(!access_token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default Genre;