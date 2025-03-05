/* eslint-disable no-new */
import React from 'react';
import * as RFIcon from 'react-feather';
import AdminLayout from '@/layouts/AdminLayout';
import Head from 'next/head';
import { Card, Col, Container, Row } from 'react-bootstrap';
import CodeBlock from '@components/Code/CodeBlocks';
import FeatherIcon from '@components/Icons/FeatherIcon';
import { FeatherIconsTypes } from '@utils/types';
import CodeLine from '@components/Code/CodeLine';

export default function UIFeather() {
  const reactFeatherIconKeys = Object.keys(RFIcon);

  const itemsPerQuarter = Math.ceil(reactFeatherIconKeys.length / 4);
  const firstQuarter = reactFeatherIconKeys.slice(0, itemsPerQuarter);
  const secondQuarter = reactFeatherIconKeys.slice(
    itemsPerQuarter,
    itemsPerQuarter * 2
  );
  const thirdQuarter = reactFeatherIconKeys.slice(
    itemsPerQuarter * 2,
    itemsPerQuarter * 3
  );
  const fourthQuarter = reactFeatherIconKeys.slice(itemsPerQuarter * 3);

  const iconLists: { id: number; data: string[] }[] = [
    { id: 1, data: firstQuarter },
    { id: 2, data: secondQuarter },
    { id: 3, data: thirdQuarter },
    { id: 4, data: fourthQuarter },
  ];

  return (
    <>
      <Head>
        <title>Feather | AdminKit Demo</title>
      </Head>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Feather</h1>
        <Row className="row">
          <Col xs={12}>
            <Card>
              <Card.Header className="pb-0">
                <Card.Title className=" ">Feather Icons</Card.Title>
                <Card.Subtitle as="h6" className=" text-muted mb-3 ">
                  Simply beautiful open source icons
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                {/* Description */}
                <Card.Title className="text-dark">
                  Using Feather Icons with FeatherIcon Component
                </Card.Title>
                <Card.Subtitle as="h6" className=" text-muted mb-3 lh-sm ">
                  The <code style={{ fontSize: 12 }}>FeatherIcon</code>{' '}
                  component is a custom component created for displaying icons
                  from the Feather icon library in React projects using
                  TypeScript. It is based on the{' '}
                  <code style={{ fontSize: 12 }}>react-feather</code> library,
                  which provides a set of pre-built icons in React components.{' '}
                </Card.Subtitle>
                {/* Exampe */}
                <Card.Title className="text-dark">Example Usage</Card.Title>
                <Card>
                  <Card.Body className="p-0">
                    <CodeBlock>
                      {`import FeatherIcon from '@components/Icons/FeatherIcon';

function MyComponent() {
  return (
    <div>
      <FeatherIcon name="Activity" size={24} color="blue" />
      <FeatherIcon name="XCircle" size={16} />
      <FeatherIcon name="ChevronDown" />
    </div>
  );
}`}
                    </CodeBlock>
                  </Card.Body>
                </Card>
                {/* Props */}
                <Card.Title className="text-dark">Props</Card.Title>
                <div>
                  <ul>
                    <li>
                      <CodeLine>name</CodeLine> (required): A string
                      representing the name of the icon to render. Must be in
                      CamelCase format and match the name of the icon in the
                      Feather Icons library.
                    </li>
                    <li>
                      <CodeLine>size</CodeLine> (optional): An optional number
                      representing the size of the icon in pixels. Defaults to
                      18 if not specified.
                    </li>
                    <li>
                      <CodeLine>color</CodeLine> (optional): An optional string
                      representing the color of the icon. If not specified, the
                      icon inherits its {`parent's`} color.
                    </li>
                    <li>
                      <CodeLine>...props</CodeLine>: Any additional props are
                      passed through to the underlying{' '}
                      <CodeLine>react-feather</CodeLine> icon component.
                    </li>
                  </ul>
                </div>

                {/* Note */}
                <Card.Title className="text-dark">Note</Card.Title>
                <p>
                  The <CodeLine>FeatherIcon</CodeLine> component relies on the{' '}
                  <CodeLine>FeatherIconsTypes</CodeLine> type which is defined
                  in the <CodeLine>@utils/types</CodeLine> module. The{' '}
                  <CodeLine>FeatherIconsTypes</CodeLine> type represents all the
                  possible names of icons that can be used with the{' '}
                  <CodeLine>FeatherIcon</CodeLine> component.
                </p>

                <Card.Title className="text-dark">Icon Names</Card.Title>

                <Row>
                  {iconLists
                    ? iconLists.map((item) => {
                        return (
                          <Col xs={12} md={6} lg={3} key={item.id}>
                            {item.data.map((icon) => {
                              const iconName = icon as FeatherIconsTypes;
                              return (
                                <div
                                  key={icon}
                                  className="mb-2 d-flex align-items-center "
                                >
                                  <FeatherIcon name={iconName} />{' '}
                                  <span
                                    className="ms-3"
                                    style={{ fontSize: 13 }}
                                  >
                                    {icon}
                                  </span>
                                </div>
                              );
                            })}
                          </Col>
                        );
                      })
                    : null}
                  {/*
                   */}
                </Row>
              </Card.Body>
            </Card>

            {/* List Icons */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

UIFeather.layout = AdminLayout;
