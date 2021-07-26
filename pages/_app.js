import { Provider } from "react-redux";
import React, { useState, useEffect } from "react";
import { useStore } from "../redux-thunk/store";
// import LayoutWrapper from '../layouts/LayoutWrapper'
import "../styles/globals.css";
import NProgress from "nprogress";
//import getConfig from 'next/config';
import Router from "next/router";
import { useRouter } from "next/router";

import Head from "next/head";
import "../styles/nprogress.css";

// const { publicRuntimeConfig } = getConfig();

// NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner });

Router.onRouteChangeStart = () => {
  // console.log('onRouteChangeStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChangeComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChangeError triggered');
  NProgress.done();
};

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head></Head>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
