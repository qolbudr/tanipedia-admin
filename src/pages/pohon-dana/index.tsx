import TablePohonDana from '@components/Tables/TablePohonDana';
import AdminLayout from '@layouts/AdminLayout';
import Head from 'next/head';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {};

export default function ArtikelPage({}: Props) {
  return (
    <>
      <Head>
        <title>Tanipedia - Pohon Dana</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Pohon Dana</h1>
        <Row className="row">
          <Col xs={12}>
            {/* <TanstackReactTable /> */}
            <TablePohonDana />
          </Col>
        </Row>
      </Container>
    </>
  );
}

ArtikelPage.layout = AdminLayout;
