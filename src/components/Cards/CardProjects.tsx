import React from 'react';
import { Card, Table } from 'react-bootstrap';
import clsx from 'classnames';
import projectsData from '@utils/dummyData/projects';

type Props = {};

function CardProjects({}: Props) {
  return (
    <Card className="card flex-fill">
      <Card.Header className="card-header">
        <Card.Title as="h5" className="card-title mb-0">
          Latest Projects
        </Card.Title>
      </Card.Header>
      <Table hover className="my-0">
        <thead>
          <tr>
            <th>Name</th>
            <th className="d-none d-xl-table-cell">Start Date</th>
            <th className="d-none d-xl-table-cell">End Date</th>
            <th>Status</th>
            <th className="d-none d-md-table-cell">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {projectsData?.map((project, idx) => {
            const key = idx;
            const badgeClsx = clsx('badge', {
              'bg-success': project.status === 'Done',
              'bg-warning': project.status === 'In progress',
              'bg-danger': project.status === 'Cancelled',
            });
            return (
              <tr key={key}>
                <td>{project.name}</td>
                <td className="d-none d-xl-table-cell">{project.startDate}</td>
                <td className="d-none d-xl-table-cell">{project.endDate}</td>
                <td>
                  <span className={badgeClsx}>{project.status}</span>
                </td>
                <td className="d-none d-md-table-cell">{project.assignedTo}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
}

export default CardProjects;
