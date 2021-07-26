import React from "react";
import { Layout, BackTop } from "antd";
const { Content } = Layout;
import Head from "next/head";
import Nav from './Nav'

const MainLayout = (props) => {
  return (
    <>
      {/* <Head>
        <title key="site_title">
          My Ecommerce Store | A Free Online Ecommerce Store For All
        </title>
      </Head> */}
      {/* <MainMetaTags /> */}

      <Layout>
        <Nav />
        <Content style={{ minHeight: 530 }}>{props.children}</Content>
       
        <BackTop />
      </Layout>
    </>
  );
};

export default MainLayout;
