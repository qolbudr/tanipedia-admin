/* eslint-disable no-new */
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Head from 'next/head';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function PagesBlank() {
  return (
    <>
      <Head>
        <title>Blank | AdminKit Demo</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Blank Page</h1>
        <Row className="row">
          <Col xs={12}>
            <Card>
              <Card.Header>
                <Card.Title className=" mb-0">Empty card</Card.Title>
              </Card.Header>
              <Card.Body>{/*  */}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

PagesBlank.layout = AdminLayout;
