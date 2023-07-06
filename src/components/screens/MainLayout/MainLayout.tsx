import React from 'react';
import {Layout} from 'antd';
import MainSider from "./Sider/MainSider";
import Navigation from "./Navigation/Navigation";
import styles from "./MainLayout.module.css"
import Head from "next/head";

const {Header, Content, Footer, Sider} = Layout;

interface NavName {
    name: string
}

const App: React.FC<NavName> = ({children, name}) => {

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