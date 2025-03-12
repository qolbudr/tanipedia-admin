/* eslint-disable no-new */
import React, { useEffect, useState } from 'react';
import AdminLayout from '@layouts/AdminLayout';
import CardChartsLine from '@components/Cards/CardChartsLine';
import { Col, Container, Row } from 'react-bootstrap';
import CardStats from '@components/Cards/CardStats';
import { ProductRepository } from '@/repository/product_repository';
import { TransactionRepository } from '@/repository/transaction_repository';
import useNotification from '@hooks/useNotification';
import { handleError } from '@utils/handleError';
import { useAuthContext } from '@utils/context/AuthContext';
import { Role } from '@prisma/client';

export default function Home() {
  const [count, setCount] = useState(0);
  const notification = useNotification({ duration: 300 });
  const auth = useAuthContext();


  useEffect(() => {
    getCountSeller();
  }, [])

  const getCountSeller = async () => {
    try {
      const reponse = await TransactionRepository.getSeller();
      const reponsse = await TransactionRepository.getAdmin();
      setCount(reponse?.count ?? 0);
    } catch (e) {
      notification.danger(handleError(e))

    }
  }

  return (
    <Container fluid className="p-0">
      <h1 className="h3">
        Dashboard
      </h1>
      <Row className="mt-3">
        <Col className="d-flex">
          <div className="w-100">
            <Row>
              {auth.user?.role === Role.seller &&
                <Col sm={12}>
                  <CardStats
                    statTitle="Total Penjualan"
                    statValue={`${count}`}
                    statIcon="Truck"
                    statPercent=""
                    statPercentColor="danger"
                    statDescription="Total penjualan semua produk"
                  />
                </Col>
              }
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

Home.layout = AdminLayout;
