import TablePengguna from '@components/Tables/TablePengguna';
import AdminLayout from '@layouts/AdminLayout';
import Head from 'next/head';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

type Props = {};

export default function UserAddPage({}: Props) {
  return (
    <>
      <Head>
        <title>Tanipedia - Tambah Pengguna</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Tambah Pengguna</h1>
        <Row className="row">
          <Col xs={12}>
            <Card>Tambah Pengguna</Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

UserAddPage.layout = AdminLayout;
