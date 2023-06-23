import React from 'react';
import {NextPage} from "next";
import SignInForm from "../../components/screens/Auth/SignInForm";
import Head from "next/head";
import {ConfigProvider, Tabs} from "antd";
import styles from "../../styles/Auth.module.css"
import Image from "next/image";
import SignUpForm from "@/components/screens/Auth/SignUpForm";
import {useRouter} from "next/router";
import Link from "next/link";

const Auth: NextPage = () => {

    const route = useRouter()
    const activeKey = route.query.form

    return (
        <>
            <style>{'body {background-color: #040404;}'}</style>
            <Head>
                <title>LyrX | Auth</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.form}>
                    <Image className={styles.formImage} width={224} height={79} src={'/../public/logo1.png'} alt={'logo'}/>
                    <div className={styles.formItems}>
                        <ConfigProvider theme={{token: {
                                colorPrimary: '#F64141'}}}>
                            <Tabs
                                tabBarStyle={{color: 'white'}}
                                defaultActiveKey={activeKey}
                                centered
                                items={[
                                    {
                                        label: "Sign In",
                                        key: 'signin',
                                        children: <SignInForm/>
                                    },
                                    {
                                        label: "Sign Up",
                                        key: 'signup',
                                        children: <SignUpForm/>
                                    },
                                ]}
                            />
                        </ConfigProvider>
                    </div>
                    <Link className={styles.formLink} href={'/'}>Back</Link>
                </div>
            </div>
        </>
    );
};

export default Auth