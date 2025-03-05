/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { Card } from 'react-bootstrap';
import * as Icon from 'react-feather';

type Props = {};

function CardProfileActivities({}: Props) {
  return (
    <Card className="card">
      <Card.Header>
        <Card.Title as="h5" className="card-title mb-0">
          Activities
        </Card.Title>
      </Card.Header>
      <Card.Body className="h-100">
        <div className="d-flex align-items-start">
          <Image
            src="/img/avatars/avatar-5.jpg"
            width={36}
            height={36}
            className="rounded-circle me-2"
            alt="Vanessa Tucker"
          />
          <div className="flex-grow-1">
            <small className="float-end text-navy">5m ago</small>
            <strong>Vanessa Tucker</strong> started following{' '}
            <strong>Christina Mason</strong>
            <br />
            <small className="text-muted">Today 7:51 pm</small>
            <br />
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-start">
          <Image
            src="/img/avatars/avatar.jpg"
            width={36}
            height={36}
            className="rounded-circle me-2"
            alt="Charles Hall"
          />
          <div className="flex-grow-1">
            <small className="float-end text-navy">30m ago</small>
            <strong>Charles Hall</strong> posted something on{' '}
            <strong>Christina Mason</strong>'s timeline
            <br />
            <small className="text-muted">Today 7:21 pm</small>
            <div className="border text-sm text-muted p-2 mt-1">
              Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
              sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
              Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
              Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
              libero venenatis faucibus. Nullam quis ante.
            </div>
            <a href="/#" className="btn btn-sm btn-danger mt-1">
              <Icon.Heart size={14} /> Like
            </a>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-start">
          <Image
            src="/img/avatars/avatar-4.jpg"
            width={36}
            height={36}
            className="rounded-circle me-2"
            alt="Christina Mason"
          />
          <div className="flex-grow-1">
            <small className="float-end text-navy">1h ago</small>
            <strong>Christina Mason</strong> posted a new blog
            <br />
            <small className="text-muted">Today 6:35 pm</small>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-start">
          <Image
            src="/img/avatars/avatar-2.jpg"
            width={36}
            height={36}
            className="rounded-circle me-2"
            alt="William Harris"
          />
          <div className="flex-grow-1">
            <small className="float-end text-navy">3h ago</small>
            <strong>William Harris</strong> posted two photos on{' '}
            <strong>Christina Mason</strong>'s timeline
            <br />
            <small className="text-muted">Today 5:12 pm</small>
            <div className="row g-0 mt-1">
              <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                <div
                  style={{
                    width: '100%',
                    height: 103,
                    position: 'relative',
                  }}
                >
                  <Image
                    src="/img/photos/unsplash-1.jpg"
                    className="img-fluid pe-2"
                    alt="Unsplash"
                    fill
                  />
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                <div
                  style={{
                    width: '100%',
                    height: 103,
                    position: 'relative',
                  }}
                >
                  <Image
                    src="/img/photos/unsplash-2.jpg"
                    className="img-fluid pe-2"
                    alt="Unsplash"
                    fill
                    //
                  />
                </div>
              </div>
            </div>
            <a href="/#" className="btn btn-sm btn-danger mt-1">
              <Icon.Heart size={14} /> Like
            </a>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-start">
          <Image
            src="/img/avatars/avatar-2.jpg"
            width={36}
            height={36}
            className="rounded-circle me-2"
            alt="William Harris"
          />
          <div className="flex-grow-1">
            <small className="float-end text-navy">1d ago</small>
            <strong>William Harris</strong> started following{' '}
            <strong>Christina Mason</strong>
            <br />
            <small className="text-muted">Yesterday 3:12 pm</small>
            <div className="d-flex align-items-start mt-1">
              <a className="pe-3" href="/#">
                <img
                  src="img/avatars/avatar-4.jpg"
                  width={36}
                  height={36}
                  className="rounded-circle me-2"
                  alt="Christina Mason"
                />
              </a>
              <div className="flex-grow-1">
                <div className="border text-sm text-muted p-2 mt-1">
                  Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id,
                  lorem. Maecenas nec odio et ante tincidunt tempus.
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-start">
          <img
            src="img/avatars/avatar-4.jpg"
            width={36}
            height={36}
            className="rounded-circle me-2"
            alt="Christina Mason"
          />
          <div className="flex-grow-1">
            <small className="float-end text-navy">1d ago</small>
            <strong>Christina Mason</strong> posted a new blog
            <br />
            <small className="text-muted">Yesterday 2:43 pm</small>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-start">
          <img
            src="img/avatars/avatar.jpg"
            width={36}
            height={36}
            className="rounded-circle me-2"
            alt="Charles Hall"
          />
          <div className="flex-grow-1">
            <small className="float-end text-navy">1d ago</small>
            <strong>Charles Hall</strong> started following{' '}
            <strong>Christina Mason</strong>
            <br />
            <small className="text-muted">Yesterdag 1:51 pm</small>
          </div>
        </div>
        <hr />
        <div className="d-grid">
          <a href="/#" className="btn btn-primary">
            Load more
          </a>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardProfileActivities;
