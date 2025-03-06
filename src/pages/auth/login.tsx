/* eslint-disable no-new */
import React from 'react';
import Head from 'next/head';
import { Card, Col, Row } from 'react-bootstrap';
import AuthLayout from '@layouts/AuthLayout';
import Image from 'next/image';
import FormSignIn from '@components/Forms/FormSignIn';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Tanipedia - Login</title>
      </Head>
      <Row className=" vh-100">
        <Col sm={10} md={8} lg={5} className=" mx-auto d-table h-100">
          <div className="d-table-cell align-middle">
            <div className="text-center mt-4 mb-4">
              <Image
                src="/tanipedia.png"
                alt="Tanipedia Logo"
                className="img-fluid"
                width={132}
                height={132}
                priority
              />
            </div>
            <Card>
              <Card.Body>
                <div className="m-sm-4">
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

LoginPage.layout = AuthLayout;
