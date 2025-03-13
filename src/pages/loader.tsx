import React from 'react';
import MiscLayout from '@/layouts/MiscLayout';
import Link from 'next/link';
import Head from 'next/head';

type Props = {};

function Loader({ }: Props) {
  return (
    <>
      <Head>
        <title>Farmer.id</title>
      </Head>
      <main className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="spinner-grow text-primary" style={{ "width": "3rem", "height": "3rem" }} role="status"></div>
      </main>
    </>
  );
}

Loader.layout = MiscLayout;

export default Loader;
