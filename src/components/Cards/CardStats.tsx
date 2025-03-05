import { FeatherIconsTypes, ThemeTypes } from '@utils/types';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import clsx from 'classnames';
import FeatherIcon from '../Icons/FeatherIcon';

type Props = {
  statTitle: string;
  statValue: string;
  statIcon: FeatherIconsTypes;
  statIconColor?: ThemeTypes;
  statDescription: string;
  statPercent: string;
  statPercentColor?: ThemeTypes;
};

function CardStats({
  statTitle,
  statValue,
  statIcon,
  statIconColor,
  statDescription,
  statPercent,
  statPercentColor,
}: Props) {
  const statIconClsx = clsx('stat', {
    [`text-${statIconColor as string}`]: true,
  });

  const statPercentClsx = clsx({
    [`text-${statPercentColor as string}`]: true,
  });

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className=" mt-0">
            <Card.Title as="h5">{statTitle}</Card.Title>
          </Col>
          <Col xs="auto" className="col-auto">
            <div className={statIconClsx}>
              <FeatherIcon name={statIcon} className="align-middle" size={18} />
            </div>
          </Col>
        </Row>
        <h1 className="mt-1 mb-3">{statValue}</h1>
        <div className="mb-0">
          <span className={statPercentClsx}>
            <i className="mdi mdi-arrow-bottom-right" /> {statPercent}
          </span>
          <span className="text-muted ms-1">{statDescription}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

CardStats.defaultProps = {
  statIconColor: 'primary',
  statPercentColor: 'danger',
} as Partial<Props>;

export default CardStats;
