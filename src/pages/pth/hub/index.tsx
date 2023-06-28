import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import {checkAuth} from "@/hook/checkAuth";
import styles from "@/components/screens/MainLayout/Navigation/Hub.module.css"
import MainLayout from "@/components/screens/MainLayout/MainLayout";

const Hub: NextPage = () => {

    return (
        <main>
            <style>{'body {background-color: #040404;}'}</style>
            <MainLayout>
                <div style={{color: "white"}}>
                    <h1>Hello</h1>
                </div>
            </MainLayout>
        </main>
    );
};


/*export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const authProps = await checkAuth(ctx)

    if('redirect' in authProps) {
        return authProps
    }

    return {
        props: {}
    }
}*/

export default Hub;