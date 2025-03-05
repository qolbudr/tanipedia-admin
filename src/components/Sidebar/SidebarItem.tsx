import Link from 'next/link';
import React from 'react';
import clsx from 'classnames';
import { FeatherIconsTypes, ThemeTypes } from '@utils/types';
import { useRouter } from 'next/router';
import FeatherIcon from '@components/Icons/FeatherIcon';

type Props = {
  href: string;
  name: string;
  icon: FeatherIconsTypes;
  badge?: string | null;
  bagdeColor?: ThemeTypes;
  disabled?: boolean;
};

function SidebarItem(props: Props) {
  const { href, name, icon, badge, bagdeColor, disabled } = props;
  const { pathname } = useRouter();

  const sidebarItemClsx = clsx('sidebar-item', {
    active: href === pathname,
  });
  return (
    <li className={sidebarItemClsx}>
      <Link
        className="sidebar-link"
        href={href}
        // onClick={(e) => {
        //   if (disabled) e.preventDefault();
        // }}
      >
        <FeatherIcon className="align-middle" name={icon} size={18} />
        <span className="align-middle ms-1">{name}</span>
        <span
          className={clsx('sidebar-badge badge', {
            [`bg-${bagdeColor}`]: bagdeColor,
          })}
        >
          {badge}
        </span>
      </Link>
    </li>
  );
}

SidebarItem.defaultProps = {
  bagdeColor: 'primary',
  badge: null,
  disabled: false,
} as Partial<Props>;

export default SidebarItem;
