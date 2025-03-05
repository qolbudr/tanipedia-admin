/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import dynamic from 'next/dynamic';
import { Card } from 'react-bootstrap';
import worldMill from '@react-jvectormap/world/worldMill.json';
import themeConfigs from '@configs/themeConfigs';

type Props = {};

const markers = [
  {
    latLng: [31.230391, 121.473701],
    name: 'Shanghai',
  },
  {
    latLng: [28.70406, 77.102493],
    name: 'Delhi',
  },
  {
    latLng: [6.524379, 3.379206],
    name: 'Lagos',
  },
  {
    latLng: [35.689487, 139.691711],
    name: 'Tokyo',
  },
  {
    latLng: [23.12911, 113.264381],
    name: 'Guangzhou',
  },
  {
    latLng: [40.7127837, -74.0059413],
    name: 'New York',
  },
  {
    latLng: [34.052235, -118.243683],
    name: 'Los Angeles',
  },
  {
    latLng: [41.878113, -87.629799],
    name: 'Chicago',
  },
  {
    latLng: [51.507351, -0.127758],
    name: 'London',
  },
  {
    latLng: [40.416775, -3.70379],
    name: 'Madrid',
  },
];

const VectorMap = dynamic(
  () => import('@react-jvectormap/core').then((m) => m.VectorMap),
  { ssr: false }
);

function CardWorldMap({}: Props) {
  const wrapperRef = React.useRef(null);

  return (
    <Card className="card flex-fill w-100">
      <Card.Header>
        <Card.Title as="h5" className="card-title mb-0">
          Real-Time
        </Card.Title>
      </Card.Header>
      <Card.Body className=" px-4">
        {/* <MapCon */}
        <div id="world_map" ref={wrapperRef}>
          <VectorMap
            backgroundColor={themeConfigs['gray-100']}
            map={worldMill}
            markers={markers}
            regionStyle={{
              initial: {
                fill: themeConfigs['gray-300'],
                justifyContent: 'center',
              },
            }}
            markerStyle={{
              initial: {
                // @ts-ignore
                r: 7,
                strokeWidth: 7,
                strokeOpacity: 'revert',
                stroke: themeConfigs.primary,
                fill: themeConfigs.primary,
              },
              hover: {
                fill: themeConfigs.primary,
                stroke: themeConfigs.primary,
                // @ts-ignore
                r: 8,
              },
            }}
            zoomOnScroll={false}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardWorldMap;
