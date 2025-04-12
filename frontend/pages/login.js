import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Form from '../components/Form';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - P2P Book Exchange</title>
        <meta name="description" content="Login to your P2P Book Exchange account" />
      </Head>
      <Navbar />
      <Form type="login" />
    </>
  );
}
