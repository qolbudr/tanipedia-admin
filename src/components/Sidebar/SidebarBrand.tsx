import Link from 'next/link';
import React from 'react';

type Props = {};

function SidebarBrand({}: Props) {
  return (
    <Link className="sidebar-brand text-center" href="/">
      <span className="align-middle">Tanipedia</span>
    </Link>
  );
}

export default SidebarBrand;
