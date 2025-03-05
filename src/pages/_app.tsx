/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
import '@/styles/app.scss';
import React from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SSRProvider } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import ComposeCtxProvider from '@utils/context';
import ToastsWrapper from '@components/Toasts/ToastsWrapper';

const queryClient = new QueryClient();

type NextPageComponentProps = NextPage & {
  provider?: React.ComponentType;
  providers?: React.ComponentType[];
  layout?: React.ComponentType;
};

type AppPropsWrapp = AppProps & {
  Component: NextPageComponentProps;
};

export default function App({ Component, pageProps }: AppPropsWrapp) {
  const Layout =
    Component.layout ||
    (({ children }: { children: React.ReactNode }) => <>{children}</>);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Responsive Admin & Dashboard Template based on Bootstrap 5"
        />
        <meta name="author" content="AdminKit" />
        <meta
          name="keywords"
          content="adminkit, bootstrap, bootstrap 5, admin, dashboard, template, responsive, css, sass, html, theme, front-end, ui kit, web"
        />
        <title>AdminKit Demo - Bootstrap 5 Admin Template</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SSRProvider>
          <ComposeCtxProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ToastsWrapper />
          </ComposeCtxProvider>
        </SSRProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
