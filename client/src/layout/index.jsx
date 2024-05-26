import React from 'react';
import {Layout} from 'antd';
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";


const Index = props => {
    return (
        <Layout>
            <Layout.Header>
                <Header/>
            </Layout.Header>
            <Layout.Content className="content">
                <Outlet/>
            </Layout.Content>
            <Layout.Footer>
                <Footer/>
            </Layout.Footer>
        </Layout>
    );
};

Index.propTypes = {};

export default Index;