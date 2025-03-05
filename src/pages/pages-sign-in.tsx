/* eslint-disable no-new */
import React from 'react';
import Head from 'next/head';
import { Card, Col, Row } from 'react-bootstrap';
import AuthLayout from '@layouts/AuthLayout';
import Image from 'next/image';
import FormSignIn from '@components/Forms/FormSignIn';

export default function PagesSignIn() {
  return (
    <>
      <Head>
        <title>Sign In | AdminKit Demo</title>
      </Head>
      <Row className=" vh-100">
        <Col sm={10} md={8} lg={6} className=" mx-auto d-table h-100">
          <div className="d-table-cell align-middle">
            <div className="text-center mt-4">
              <h1 className="h2">Welcome back, Charles</h1>
              <p className="lead">Sign in to your account to continue</p>
            </div>
            <Card>
              <Card.Body>
                <div className="m-sm-4">
                  <div className="text-center">
                    <Image
                      src="/img/avatars/avatar.jpg"
                      alt="Charles Hall"
                      className="img-fluid rounded-circle"
                      width={132}
                      height={132}
                      priority
                    />
                  </div>
                  <FormSignIn />
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
}

PagesSignIn.layout = AuthLayout;
