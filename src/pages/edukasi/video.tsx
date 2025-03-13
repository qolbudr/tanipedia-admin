import TableArtikel from '@components/Tables/TableArtikel';
import TableKategoriVideo from '@components/Tables/TableKategoriVideo';
import TablePengguna from '@components/Tables/TablePengguna';
import TableVideo from '@components/Tables/TableVideo';
import AdminLayout from '@layouts/AdminLayout';
import Head from 'next/head';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {};

export default function VideoPage({}: Props) {
  return (
    <>
      <Head>
        <title>Farmer.id - Video</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Video</h1>
        <Row className="row">
          <Col xs={12}>
            <TableVideo />
          </Col>
        </Row>
      </Container>
    </>
  );
}

VideoPage.layout = AdminLayout;
