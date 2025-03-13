import TableArtikel from '@components/Tables/TableArtikel';
import TablePengguna from '@components/Tables/TablePengguna';
import AdminLayout from '@layouts/AdminLayout';
import Head from 'next/head';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {};

export default function ArtikelPage({}: Props) {
  return (
    <>
      <Head>
        <title>Farmer.id - Artikel</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Artikel</h1>
        <Row className="row">
          <Col xs={12}>
            {/* <TanstackReactTable /> */}
            <TableArtikel />
          </Col>
        </Row>
      </Container>
    </>
  );
}

ArtikelPage.layout = AdminLayout;
