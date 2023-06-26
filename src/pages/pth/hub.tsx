import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import {checkAuth} from "@/hook/checkAuth";
import HubSideBar from "@/components/HubSideBar";
import styles from "@/styles/Hub.module.css"

const Hub: NextPage = () => {

    return (
        <main>
            <style>{'body {background-color: #040404;}'}</style>
            <HubSideBar/>
            <div style={{color: "white"}}>
                <h1>Hello</h1>
            </div>
        </main>
    );
};


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const authProps = await checkAuth(ctx)

    if('redirect' in authProps) {
        return authProps
    }

    return {
        props: {}
    }
}

export default Hub;