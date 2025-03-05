import React from 'react';

type Props = {
  title: string;
} & React.HTMLProps<HTMLLIElement>;

function SidebarHeader({ title }: Props) {
  return <li className="sidebar-header">{title}</li>;
}

export default SidebarHeader;
