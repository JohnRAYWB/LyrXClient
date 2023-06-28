import React from 'react';
import {Layout} from 'antd';
import MainSider from "./Sider/MainSider";
import Navigation from "./Navigation/Navigation";

const {Header, Content, Footer, Sider} = Layout;

const App: React.FC = ({children}) => {

    return (
        <Layout style={{backgroundColor: 'inherit'}}>
                <Sider style={{backgroundColor: 'inherit'}} width={320}>
                    <MainSider/>
                </Sider>
            <Layout className="site-layout" style={{backgroundColor: 'inherit'}}>
                <Header style={{background: 'inherit'}}><Navigation/></Header>
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    {children}
                </Content>
                <Footer style={{backgroundColor: 'inherit', color: 'white', textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default App;