import React from 'react';
import { Col, ListGroupItem, Row } from 'react-bootstrap';
import { formatDistance } from 'date-fns';
import Image from 'next/image';

type Props = {
  title: string;
  content?: string | React.ReactNode | null;
  timestamp?: string;
  images?: string;
};

function DropdownMessageItem({ title, timestamp, content, images }: Props) {
  let timeAgo = '';
  if (timestamp) {
    const timePeriod = formatDistance(new Date(timestamp), new Date(), {
      addSuffix: true,
    });
    //  formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <ListGroupItem as="a" href="/#">
      <Row className=" g-0 align-items-center">
        <Col xs={2} className=" position-relative ">
          <Image
            src={images ?? '/img/avatars/avatar-5.jpg'}
            className=" avatar rounded-circle  "
            style={{
              // position : 'ce'
              objectFit: 'cover',
            }}
            width={47}
            height={47}
            alt={title}
          />
        </Col>
        <Col xs={10} className="ps-2">
          <div className="text-dark">{title}</div>
          <div className="text-muted small mt-1">{content}</div>
          <div className="text-muted small mt-1">{timeAgo}</div>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

DropdownMessageItem.defaultProps = {
  content: null,
  title: 'Unknown',
  timestamp: new Date().toISOString(),
  image: '/img/avatars/avatar-5.jpg',
} as Partial<Props>;

export default DropdownMessageItem;
