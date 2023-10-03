import React, {ReactNode, useState} from 'react';
import {Layout} from 'antd';
import Head from "next/head";

import styles from "./MainLayout.module.css"
import MainSider from "./Sider/MainSider";
import Navigation from "./Navigation/Navigation";
import FooterPlayer from "@/components/Player/FooterPlayer";
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {selectTrackData, setCurrentTrack} from "@/store/slice/player";

const {Header, Content, Footer, Sider} = Layout;

interface NavName {
    children: ReactNode
    searchElement?: ReactNode
    name: string
}

const App: React.FC<NavName> = ({children, searchElement, name}) => {

    const [popup, setPopup] = useState(false)

    const dispatch = useAppDispatch()
    const player = useAppSelector(selectTrackData)

    if (typeof window !== "undefined" && localStorage.getItem('player') && JSON.parse(localStorage.getItem('player')).currentTrack !== null && player.currentTrack === null) {
        dispatch(setCurrentTrack(JSON.parse(localStorage.getItem('player'))))
    }

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
                    <Content className={styles.main} hidden={popup}>
                        {children}
                    </Content>
                    <Footer className={styles.footer}>© LyrX | All rights reserved</Footer>
                </Layout>
            </Layout>
            {player.currentTrack !== null ?
                <FooterPlayer popup={popup} setPopup={setPopup}/>
                :
                null
            }
        </>
    )
};

export default App;