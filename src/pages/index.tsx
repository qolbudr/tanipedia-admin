/* eslint-disable no-new */
import React from 'react';
import AdminLayout from '@layouts/AdminLayout';
import CardChartsLine from '@components/Cards/CardChartsLine';
import { Col, Container, Row } from 'react-bootstrap';
import CardStats from '@components/Cards/CardStats';
import CardFlatpickr from '@components/Cards/CardFlatpickr';
import CardChartsPie from '@components/Cards/CardChartsPie';
// import CardWorldMap from '@components/Cards/CardWorldMap';
import CardChartsBar from '@components/Cards/CardChartsBar';
import CardProjects from '@components/Cards/CardProjects';

export default function Home() {
  return (
    <Container fluid className="p-0">
      <h1 className="h3">
        <strong>Analytics</strong> Dashboard
      </h1>
      <Row className="mt-3">
        <Col xl={6} xxl={5} className="d-flex">
          <div className="w-100">
            <Row>
              <Col sm={6}>
                <CardStats
                  statTitle="Sales"
                  statValue="3.382"
                  statIcon="Truck"
                  statPercent="-3.65%"
                  statPercentColor="danger"
                  statDescription="Since last week"
                />
                <CardStats
                  statTitle="Visitors"
                  statValue="14.212"
                  statIcon="Users"
                  statPercent="5.25%"
                  statPercentColor="success"
                  statDescription="Since last week"
                />
              </Col>
              <Col sm={6}>
                <CardStats
                  statTitle="Earnings"
                  statValue="$21.300"
                  statIcon="DollarSign"
                  statPercent="6.65%"
                  statPercentColor="success"
                  statDescription="Since last week"
                />
                <CardStats
                  statTitle="Orders"
                  statValue="64"
                  statIcon="ShoppingCart"
                  statPercent="-2.25%"
                  statPercentColor="danger"
                  statDescription="Since last week"
                />
              </Col>
            </Row>
          </div>
        </Col>
        <div className="col-xl-6 col-xxl-7">
          <CardChartsLine />
        </div>
      </Row>
      <Row>
        <Col xs={12} md={6} xxl={3} className="d-flex order-2 order-xxl-3">
          <CardChartsPie />
        </Col>
        <Col xs={12} md={6} xxl={3} className="d-flex order-1 order-xxl-1">
          <CardFlatpickr />
        </Col>
        {/* <Col xl={12} md={12} xxl={6} className="d-flex order-3 order-xxl-2"> */}
          {/*  */}
          {/* <CardWorldMap /> */}
        {/* </Col> */}
      </Row>

      <Row>
        <Col xs={12} lg={8} xxl={9} className=" d-flex">
          <CardProjects />
        </Col>
        <Col xs={12} lg={4} xxl={3} className="d-flex">
          <CardChartsBar />
        </Col>
      </Row>
    </Container>
  );
}

Home.layout = AdminLayout;
