/* eslint-disable @next/next/no-img-element */
import React from 'react';
import * as Icon from 'react-feather';
import { Dropdown, NavItem } from 'react-bootstrap';
import DropdownToggle from '../DropdownToggle';

type Props = {};

function DropdownUserProfile({}: Props) {
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle
        as={DropdownToggle}
        id="Profiledropdown"
        className="nav-icon d-inline-block d-sm-none"
      >
        <Icon.Settings size={18} />
      </Dropdown.Toggle>
      <Dropdown.Toggle
        as={DropdownToggle}
        id="Profiledropdown"
        className="nav-link d-none d-sm-inline-block"
      >
        <img
          src="/img/avatars/avatar.jpg"
          className="avatar img-fluid rounded me-1"
          alt="Charles Hall"
        />{' '}
        <span className="text-dark me-1">Charles Hall</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="dropdown-menu-end"
        aria-labelledby="Profiledropdown"
      >
        <Dropdown.Item href="pages-profile.html">
          <Icon.User className="align-middle me-1" size={18} /> Profile
        </Dropdown.Item>
        <Dropdown.Item href="/#">
          <Icon.PieChart className="align-middle me-1" size={18} /> Analytics
        </Dropdown.Item>
        <div className="dropdown-divider" />
        <Dropdown.Item href="index.html">
          <Icon.Settings className="align-middle me-1" size={18} /> Settings
          &amp; Privacy
        </Dropdown.Item>
        <Dropdown.Item href="/#">
          <Icon.HelpCircle className="align-middle me-1" size={18} /> Help
          Center
        </Dropdown.Item>
        <div className="dropdown-divider" />
        <Dropdown.Item href="/#">Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownUserProfile;
