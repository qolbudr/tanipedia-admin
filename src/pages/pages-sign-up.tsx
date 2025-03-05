/* eslint-disable no-new */
import React from 'react';
import Head from 'next/head';
import { Card, Col, Row } from 'react-bootstrap';
import AuthLayout from '@layouts/AuthLayout';
import FormSignUp from '@components/Forms/FormSignUp';

export default function PagesSignUp() {
  return (
    <>
      <Head>
        <title>Sign Up | AdminKit Demo</title>
      </Head>
      <Row className=" vh-100">
        <Col sm={10} md={8} lg={6} className=" mx-auto d-table h-100">
          <div className="d-table-cell align-middle">
            <div className="text-center mt-4">
              <h1 className="h2">Get started</h1>
              <p className="lead">
                Start creating the best possible user experience for you
                customers.
              </p>
            </div>
            <Card>
              <Card.Body>
                <div className="m-sm-4">
                  <FormSignUp />
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
}

PagesSignUp.layout = AuthLayout;
