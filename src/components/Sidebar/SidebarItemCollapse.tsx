import React from 'react';
import { Collapse } from 'react-bootstrap';
import clsx from 'classnames';
import FeatherIcon from '@components/Icons/FeatherIcon';
import { FeatherIconsTypes, ThemeTypes } from '@utils/types';
import { useRouter } from 'next/router';
import Link from 'next/link';

type SubLinkItems = {
  name: string;
  href: string;
  badge?: string;
  bagdeColor?: ThemeTypes;
  disabled?: boolean;
};

type Props = {
  name: string;
  icon: FeatherIconsTypes;
  links: SubLinkItems[];
};

function SidebarItemCollapse({ icon, name, links }: Props) {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useRouter();
  const isActive = links.find((i) => i.href === pathname);

  React.useEffect(() => {
    if (isActive) {
      setOpen(true);
    }
    return () => {
      setOpen(false);
    };
  }, [isActive]);

  const IdControls = name.toLocaleLowerCase().replace(/\s+/g, '-');
  const sidebarLinkClsx = clsx('sidebar-link', {
    collapsed: open,
  });
  const sidebarItemClsx = clsx('sidebar-item', {
    active: isActive,
  });

  return (
    <li className={sidebarItemClsx}>
      <a
        href="#/"
        onClick={() => setOpen(!open)}
        aria-controls={IdControls}
        aria-expanded={open}
        data-bs-toggle="collapse"
        className={sidebarLinkClsx}
      >
        <FeatherIcon className="align-middle" name={icon} />
        <span className="align-middle ms-1">{name}</span>
      </a>
      <Collapse in={open}>
        <ul className="sidebar-dropdown list-unstyled" id={IdControls}>
          {links
            ? links.map((lk, idx) => {
                const key = idx;
                const subLinkClsx = clsx('sidebar-item', {
                  active: lk.href === pathname,
                });

                return (
                  <li key={key} className={subLinkClsx}>
                    <Link
                      className="sidebar-link"
                      href={lk.href}
                      onClick={(e) => {
                        if (lk.disabled) e.preventDefault();
                      }}
                    >
                      {lk.name}
                      {lk?.badge ? (
                        <span
                          className={clsx('sidebar-badge badge', {
                            [`bg-${lk.bagdeColor}`]: lk.bagdeColor,
                            'bg-primary': !lk.bagdeColor,
                          })}
                        >
                          {lk?.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })
            : null}
          {/* <li className="sidebar-item">
            <a className="sidebar-link" href="pages-settings.html">
              Settings
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-projects.html">
              Projects{' '}
              <span className="sidebar-badge badge bg-primary">Pro</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-clients.html">
              Clients{' '}
              <span className="sidebar-badge badge bg-primary">Pro</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-orders.html">
              Orders <span className="sidebar-badge badge bg-primary">Pro</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-pricing.html">
              Pricing{' '}
              <span className="sidebar-badge badge bg-primary">Pro</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-chat.html">
              Chat <span className="sidebar-badge badge bg-primary">Pro</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-blank.html">
              Blank Page
            </a>
          </li> */}
        </ul>
      </Collapse>
    </li>
  );
}

export default SidebarItemCollapse;
