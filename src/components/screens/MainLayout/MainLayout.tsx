import React, {useState} from 'react';
import {Layout} from 'antd';
import MainSider from "./Sider/MainSider";
import Navigation from "./Navigation/Navigation";
import styles from "./MainLayout.module.css"
import Head from "next/head";
import {GetServerSidePropsContext} from "next";
import {checkAuth} from "@/hook/checkAuth";
import * as Api from "@/api"
import {userDto} from "@/api/dto/user.dto";

const {Header, Content, Footer, Sider} = Layout;

interface NavName {
    name: string
    userData: userDto
}

const App: React.FC<NavName> = ({children, name, userData}) => {

    const [user, setUser] = useState(userData)

    return (
        <>
            <Head>
                <title>{`${name} | LyrX`}</title>
            </Head>
            <Layout style={{backgroundColor: '#060606'}}>
                <Sider style={{backgroundColor: 'inherit'}} width={320}>
                    <MainSider/>
                </Sider>
                <Layout className="site-layout" style={{backgroundColor: 'inherit'}}>
                    <Header style={{background: 'inherit', height: 100}}><Navigation name={name}/></Header>
                    <Content className={styles.main}>
                        {children}
                    </Content>
                    <Footer className={styles.footer}>© LyrX | All rights reserved</Footer>
                </Layout>
            </Layout>
        </>
    )
};

export default App;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    console.log(ctx)
}
