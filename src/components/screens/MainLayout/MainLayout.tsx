import React from 'react';
import {Layout} from 'antd';
import MainSider from "./Sider/MainSider";
import Navigation from "./Navigation/Navigation";
import styles from "./MainLayout.module.css"
import Head from "next/head";

const {Header, Content, Footer, Sider} = Layout;

interface MainLayoutProps {
    pageProps: {
        title: string,
        description?: string,
        keywords?: string,
    }
}


const App: React.FC<MainLayoutProps> = ({children, pageProps}) => {

    return (
        <>
            <Head>
                <title>{`${pageProps.title} | LyX`}</title>
                <meta name='description' content={`LyrX | Music platform. Your music species library. ${pageProps.description}`}/>
                <meta name='robots' content={'index, follow'}/>
                <meta name='keywords' content={pageProps.keywords || 'music, tracks, artists, albums, playlists'}/>
            </Head>
            <Layout style={{backgroundColor: '#060606'}}>
                <Sider style={{backgroundColor: 'inherit'}} width={320}>
                    <MainSider/>
                </Sider>
                <Layout className="site-layout" style={{backgroundColor: 'inherit'}}>
                    <Header style={{background: 'inherit', height: 100}}><Navigation name={`${pageProps.title} | LyrX`}/></Header>
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