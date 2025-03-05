import Head from 'next/head';
import React from 'react';
import AdminLayout from '@layouts/AdminLayout';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import useNotification from '@hooks/useNotification';
import CodeLine from '@components/Code/CodeLine';

type Props = {};

export default function ToastsPage({}: Props) {
  const notify = useNotification({});

  return (
    <>
      <Head>
        <title>Notificatoin | AdminKit Demo</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Notificatoin</h1>
        <Row className="row">
          <Col xs={12}>
            <Card>
              <Card.Header>
                <Card.Title className="">Toast notifications</Card.Title>
                <Card.Subtitle as="h6" className="text-muted">
                  Toast notification using <CodeLine>react-hot-toast</CodeLine>.
                  See official documentation{' '}
                  <a
                    href="https://react-hot-toast.com/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    here
                  </a>
                  .
                </Card.Subtitle>
              </Card.Header>
              <Card.Body className="text-dark">
                <Card.Title className="text-dark">Examples</Card.Title>
                <div className="d-flex gap-2 mb-3">
                  <Button
                    variant="primary"
                    onClick={() => notify.primary('This is primary toast')}
                  >
                    Primary
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => notify.success('This is success toast')}
                  >
                    Success
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => notify.danger('This is danger toast')}
                  >
                    Danger
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => notify.info('This is info toast')}
                  >
                    Info
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => notify.warning('This warning toast')}
                  >
                    Warning
                  </Button>
                </div>
                <Card.Title className="text-dark">Note</Card.Title>
                <Card.Text className="">
                  To modify the location of notifications, simply adjust the{' '}
                  <CodeLine>position</CodeLine> properties within the{' '}
                  <CodeLine>ToastContainer</CodeLine> component found in the{' '}
                  <CodeLine>@component/toast/ToastWrapper.tsx</CodeLine> file.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

ToastsPage.layout = AdminLayout;
