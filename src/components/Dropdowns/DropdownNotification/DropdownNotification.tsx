import React from 'react';
import { Dropdown, NavItem } from 'react-bootstrap';
import * as Icon from 'react-feather';
import { useAdminLayoutContext } from '@utils/context/AdminLayoutContext';
import DropdownToggle from '../DropdownToggle';
import DropdownNotificationItem from './DropdownNotificationItem';

type Props = {};

function DropdownNotification({}: Props) {
  const { notifications } = useAdminLayoutContext();
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle
        as={DropdownToggle}
        id="alertsDropdown"
        className="nav-icon"
      >
        <div className="position-relative">
          <Icon.Bell className="align-middle text-secondary " size={20} />
          <span className="indicator">{notifications.length}</span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="dropdown-menu-lg dropdown-menu-end py-0"
        aria-labelledby="alertsDropdown"
      >
        <div className="dropdown-menu-header">
          {notifications.length} New Notifications
        </div>
        <div className="list-group">
          {notifications
            ? notifications.map((nf) => {
                return (
                  <DropdownNotificationItem
                    key={nf.id}
                    title={nf.title}
                    icon={nf?.icon}
                    iconVariant={nf?.iconColor ?? 'info'}
                    content={nf.message}
                    timestamp={nf.timestamp.toString()}
                  />
                );
              })
            : null}
        </div>
        <div className="dropdown-menu-footer">
          <a href="/#" className="text-muted">
            Show all notifications
          </a>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownNotification;
