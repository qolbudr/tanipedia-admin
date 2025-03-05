import React from 'react';
import { Col, ListGroupItem, Row } from 'react-bootstrap';

import { FeatherIconsTypes, ThemeTypes } from '@utils/types';
import themeConfigs from '@configs/themeConfigs';
import { formatDistance } from 'date-fns';
import FeatherIcon from '@components/Icons/FeatherIcon';

type Props = {
  title: string;
  content?: string | React.ReactNode | null;
  timestamp?: string;
  icon: FeatherIconsTypes;
  iconVariant?: ThemeTypes;
};

function DropdownNotificationItem({
  title,
  icon,
  timestamp,
  content,
  iconVariant,
}: Props) {
  const iconColor =
    (themeConfigs[iconVariant as ThemeTypes] as string) ?? themeConfigs.primary;

  let timeAgo = '';
  if (timestamp) {
    const timePeriod = formatDistance(new Date(timestamp), new Date(), {
      addSuffix: true,
    });
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <ListGroupItem as="a" href="/#">
      <Row className=" g-0 align-items-center">
        <Col xs={2}>
          <FeatherIcon name={icon} color={iconColor} size={18} />
        </Col>
        <Col xs={10}>
          <div className="text-dark">{title}</div>
          <div className="text-muted small mt-1">{content}</div>
          <div className="text-muted small mt-1">{timeAgo}</div>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

DropdownNotificationItem.defaultProps = {
  content: null,
  title: 'Notif Title',
  timestamp: '30m ago',
  icon: 'Bell',
  iconVariant: 'primary',
} as Partial<Props>;

export default DropdownNotificationItem;
