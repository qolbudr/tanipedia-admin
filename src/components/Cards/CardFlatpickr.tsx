import React from 'react';
import { Card } from 'react-bootstrap';
import { format, set } from 'date-fns';
import flatpickr from 'flatpickr';

type Props = {};

function CardFlatpickr({}: Props) {
  React.useEffect(() => {
    const defaultDate = format(set(new Date(), { date: 17 }), 'yyyy-M-dd');
    const datetimepickerDashboard = document.getElementById(
      'datetimepicker-dashboard'
    ) as HTMLElement;
    if (datetimepickerDashboard) {
      flatpickr(datetimepickerDashboard, {
        inline: true,
        prevArrow: '<span title="Previous month">&laquo;</span>',
        nextArrow: '<span title="Next month">&raquo;</span>',
        defaultDate,
      });
    }
  }, []);

  return (
    <Card className="flex-fill">
      <Card.Header>
        <Card.Title as="h5" className=" mb-0">
          Calendar
        </Card.Title>
      </Card.Header>
      <Card.Body className="card-body d-flex">
        <div className="align-self-center w-100">
          <div className="chart">
            <div id="datetimepicker-dashboard" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardFlatpickr;
