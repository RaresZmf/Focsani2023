import React from 'react';
import Layout from '../components/Layout';
import { UserProvider } from '@auth0/nextjs-auth0/client';


import '../styles/globals.css';

// initFontAwesome();

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
