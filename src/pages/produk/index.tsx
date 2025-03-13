import TablePohonDana from '@components/Tables/TablePohonDana';
import TableProduct from '@components/Tables/TableProduct';
import AdminLayout from '@layouts/AdminLayout';
import Head from 'next/head';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {};

export default function ProdukPage({}: Props) {
  return (
    <>
      <Head>
        <title>Farmer.id - Produk</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Produk</h1>
        <Row className="row">
          <Col xs={12}>
            {/* <TanstackReactTable /> */}
            <TableProduct />
          </Col>
        </Row>
      </Container>
    </>
  );
}

ProdukPage.layout = AdminLayout;
