import TablePerson from '@components/Tables/TablePerson';
import AdminLayout from '@layouts/AdminLayout';
import Head from 'next/head';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {};

export default function TableReactPage({}: Props) {
  return (
    <>
      <Head>
        <title>React Table | AdminKit Demo</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">React Table</h1>
        <Row className="row">
          <Col xs={12}>
            {/* <TanstackReactTable /> */}
            <TablePerson />
          </Col>
        </Row>
      </Container>
    </>
  );
}

TableReactPage.layout = AdminLayout;
