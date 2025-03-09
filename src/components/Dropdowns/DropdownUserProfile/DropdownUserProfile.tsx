/* eslint-disable @next/next/no-img-element */
import React from 'react';
import * as Icon from 'react-feather';
import { Dropdown, NavItem } from 'react-bootstrap';
import DropdownToggle from '../DropdownToggle';
import { useAuthContext } from '@utils/context/AuthContext';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

type Props = {};

function DropdownUserProfile({ }: Props) {
  const auth = useAuthContext();
  const router = useRouter();

  const logout = () => {
    Swal.fire({
      icon: "question",
      title: "Apakah kamu yakin ingin keluar?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        router.replace('/auth/login');
      }
    });
  }

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
          src={`${location.origin}/avatar/${auth?.user?.photo}`}
          className="avatar img-fluid rounded-circle me-2"
          alt="Charles Hall"
        />{' '}
        <span className="text-dark me-1">{auth.user?.name}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="dropdown-menu-end mt-3"
        aria-labelledby="Profiledropdown"
      >
        <Dropdown.Item href="pages-profile.html">
          <Icon.User className="align-middle me-1" size={18} /> Profile
        </Dropdown.Item>
        {/* <Dropdown.Item href="/#">
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
        </Dropdown.Item> */}
        <div className="dropdown-divider" />
        <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownUserProfile;
