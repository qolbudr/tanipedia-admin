import TablePengguna from '@components/Tables/TablePengguna';
import AdminLayout from '@layouts/AdminLayout';
import Head from 'next/head';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {};

export default function UserPage({}: Props) {
  return (
    <>
      <Head>
        <title>Tanipedia - Pengguna</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Pengguna</h1>
        <Row className="row">
          <Col xs={12}>
            {/* <TanstackReactTable /> */}
            <TablePengguna />
          </Col>
        </Row>
      </Container>
    </>
  );
}

UserPage.layout = AdminLayout;
