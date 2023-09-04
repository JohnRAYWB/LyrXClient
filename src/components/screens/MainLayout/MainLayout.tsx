import React, {ReactNode} from 'react';
import {Layout} from 'antd';
import Head from "next/head";

import styles from "./MainLayout.module.css"
import MainSider from "./Sider/MainSider";
import Navigation from "./Navigation/Navigation";
import FooterPlayer from "@/components/Player/FooterPlayer";
import {useAppSelector} from "@/hook/redux";
import {selectTrackData} from "@/store/slice/player";

const {Header, Content, Footer, Sider} = Layout;

interface NavName {
    children: ReactNode
    searchElement?: ReactNode
    name: string
}

const App: React.FC<NavName> = ({children, searchElement, name}) => {

    const player = useAppSelector(selectTrackData)

    return (
        <>
            <Head>
                <title>{`${name} | LyrX`}</title>
            </Head>
            <Layout style={{backgroundColor: '#060606'}}>
                <Sider style={{backgroundColor: 'inherit'}} width={320}>
                    <MainSider searchField={searchElement}/>
                </Sider>
                <Layout className="site-layout" style={{backgroundColor: 'inherit'}}>
                    <Header style={{background: 'inherit', height: 100}}><Navigation name={name}/></Header>
                    <Content className={styles.main}>
                        {children}
                    </Content>
                    <Footer className={styles.footer}>© LyrX | All rights reserved</Footer>
                </Layout>
            </Layout>
            {player.currentTrack ?
                <FooterPlayer/>
                :
                null
            }
        </>
    )
};

export default App;