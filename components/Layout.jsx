import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Head from 'next/head';
import Loading from './Loading';
import NavBar from './NavBar';
import Link from 'next/link';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

function Layout({ children }) {
  const [loading, setloading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, [])

  return (
    <>
      {!loading ? <><Head>
        <title>RoboZone</title>
      </Head>
        <main id="app" className='bg-repeat flex flex-col text-white bg_pattern w-screen justify-between content-center items-center'>
        <NavBar />
          <Container className='min-h-[100vh] ml-[70px]'>{children}</Container>
          <div className='shadow-md text-sm text-bold text-gray-700 bg-white white rounded-b-none flex-wrap border-b-0 border-2 border-gray-100 p-5 flex flex-row justify-center sm:justify-between rounded-xl max-w-[500px] w-[80vw] space-x-3'>
            <Link href={"https://github.com/RaresZmf/RoboZone"}>GitHub</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/"} className='sm:hidden'>Home</Link>
            <span>Copyright 2023 &copy; RoboZone</span>
          </div>
        </main></> : <Loading />}
    </>
  )
}

export default withPageAuthRequired(Layout, {
  onRedirecting: () => '',
});
