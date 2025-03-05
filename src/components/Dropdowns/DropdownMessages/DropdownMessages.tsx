import React from 'react';
import { Dropdown, NavItem } from 'react-bootstrap';
import * as Icon from 'react-feather';
import { useAdminLayoutContext } from '@utils/context/AdminLayoutContext';
import DropdownToggle from '../DropdownToggle';
import DropdownMessageItem from './DropdownMessageItem';

type Props = {};

function DropdownMessages({}: Props) {
  const { messages } = useAdminLayoutContext();
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle
        as={DropdownToggle}
        id="alertsDropdown"
        className="nav-icon"
      >
        <div className="position-relative">
          <Icon.MessageSquare
            className="align-middle text-secondary "
            size={20}
          />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="dropdown-menu-lg dropdown-menu-end py-0"
        aria-labelledby="alertsDropdown"
      >
        <div className="dropdown-menu-header">
          {messages.length} New Notifications
        </div>
        <div className="list-group">
          {messages
            ? messages.map((msg) => {
                return (
                  <DropdownMessageItem
                    key={msg.id}
                    title={msg.title}
                    images={msg.image}
                    content={msg.message}
                    timestamp={msg.timestamp.toString()}
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

export default DropdownMessages;
