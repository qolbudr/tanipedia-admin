import Link from 'next/link';
import React from 'react';

type Props = {};

function SidebarBrand({}: Props) {
  return (
    <Link className="sidebar-brand text-center" href="/">
      <span className="align-middle">Farmer.id</span>
    </Link>
  );
}

export default SidebarBrand;
