/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Card } from 'react-bootstrap';
import themeConfigs from '@configs/themeConfigs';

type Props = {};

const markers = [
  {
    coords: [31.230391, 121.473701],
    name: 'Shanghai',
  },
  {
    coords: [28.70406, 77.102493],
    name: 'Delhi',
  },
  {
    coords: [6.524379, 3.379206],
    name: 'Lagos',
  },
  {
    coords: [35.689487, 139.691711],
    name: 'Tokyo',
  },
  {
    coords: [23.12911, 113.264381],
    name: 'Guangzhou',
  },
  {
    coords: [40.7127837, -74.0059413],
    name: 'New York',
  },
  {
    coords: [34.052235, -118.243683],
    name: 'Los Angeles',
  },
  {
    coords: [41.878113, -87.629799],
    name: 'Chicago',
  },
  {
    coords: [51.507351, -0.127758],
    name: 'London',
  },
  {
    coords: [40.416775, -3.70379],
    name: 'Madrid ',
  },
];

function CardWorldMap({}: Props) {
  const effectRan = React.useRef(false);
  const [map, setMap] = React.useState(null);

  const initial = async () => {
    try {
      // @ts-ignore
      const importJsVectorMap = await import(
        // @ts-ignore
        'jsvectormap/dist/js/jsvectormap'
      );
      // @ts-ignore
      await import('jsvectormap/dist/maps/world');

      const JsVectorMap = importJsVectorMap.default;
      if (JsVectorMap) {
        const setupMap = new JsVectorMap({
          map: 'world',
          selector: '#world_map',
          zoomButtons: true,
          markers,
          regionStyle: {
            initial: {
              fill: themeConfigs['gray-300'],
              justifyContent: 'center',
            },
          },
          markerStyle: {
            initial: {
              r: 9,
              strokeWidth: 7,
              stokeOpacity: 0.4,
              fill: themeConfigs.primary,
            },
            hover: {
              fill: themeConfigs.primary,
              stroke: themeConfigs.primary,
            },
          },
          zoomOnScroll: false,
        });
        setMap(setupMap);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to js jsvectormap import');
    }
  };

  React.useEffect(() => {
    // @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let setupmap: any;
    if (effectRan.current === true) {
      initial();
      if (map) setupmap = map;
    }
    window.addEventListener('resize', () => {
      setupmap?.updateSize();
    });
    return () => {
      effectRan.current = true;
      window.addEventListener('resize', () => {
        setupmap?.updateSize();
      });
    };
  }, []);

  return (
    <Card className="card flex-fill w-100">
      <Card.Header>
        <Card.Title as="h5" className="card-title mb-0">
          Real-Time
        </Card.Title>
      </Card.Header>
      <Card.Body className=" px-4">
        {/* <MapCon */}
        <div
          id="world_map"
          style={{
            height: 350,
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default CardWorldMap;
