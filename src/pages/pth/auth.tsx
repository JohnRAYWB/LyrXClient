import React from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {ConfigProvider, Tabs} from "antd";
import {useRouter} from "next/router";

import styles from "../../styles/Auth.module.css"
import SignInForm from "../../components/screens/Auth/SignInForm";
import SignUpForm from "@/components/screens/Auth/SignUpForm";

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
                                colorPrimary: '#F64141',
                                colorBgBase: '#383838',
                        }}}>
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if(access_token) {
            return {
                redirect: {
                    destination: '/pth/hub',
                    permanent: false
                }
            }
        }

    } catch (e) {
        console.log(e)
    }
})

export default Auth