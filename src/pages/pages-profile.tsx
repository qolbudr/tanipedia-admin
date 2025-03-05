/* eslint-disable no-new */
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import CardProfile from '@components/Cards/CardProfile';
import CardProfileActivities from '@components/Cards/CardProfileActivities';
import Head from 'next/head';

export default function PagesProfile() {
  return (
    <>
      <Head>
        <title>Profile | AdminKit Demo</title>
      </Head>
      <Container fluid className="p-0">
        <div className="mb-3">
          <h1 className="h3 d-inline align-middle me-1">Profile</h1>
          <Link
            className="badge bg-dark text-white ms-2"
            href="/pages/upgrade-to-pro"
          >
            Get more page examples
          </Link>
        </div>
        <Row>
          <Col md={4} xl={3}>
            <CardProfile />
          </Col>
          <Col md={8} xl={9}>
            <CardProfileActivities />
          </Col>
        </Row>
      </Container>
    </>
  );
}

PagesProfile.layout = AdminLayout;
