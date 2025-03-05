/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SimpleBar from 'simplebar-react';
import clsx from 'classnames';
import { useAdminLayoutContext } from '@utils/context/AdminLayoutContext';
import navigationConfigs from '@configs/navigationConfigs';
import SidebarBrand from './SidebarBrand';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';
import SidebarItemCollapse from './SidebarItemCollapse';
import SidebarCta from './SidebarCta';

type Props = {};

export default function Sidebar({}: Props) {
  const scrollableNodeRef = React.createRef<any>();
  const ref = React.useRef<any>();

  const { openSidebar } = useAdminLayoutContext();

  React.useEffect(() => {
    ref?.current?.recalculate();
  }, []);

  const sidebarClassName = clsx('sidebar', {
    collapsed: openSidebar,
  });

  return (
    <nav id="sidebar" className={sidebarClassName}>
      <SimpleBar
        scrollableNodeProps={{ ref: scrollableNodeRef }}
        className="sidebar-content border-dark  "
      >
        <SidebarBrand />
        <ul className="sidebar-nav">
          {Object.keys(navigationConfigs).map((key) => {
            return (
              <React.Fragment key={key}>
                <SidebarHeader title={navigationConfigs[key].title} />
                {navigationConfigs[key].navItems.map((nv, idx) => {
                  const navKey = idx;
                  if (nv?.navSubItems) {
                    return (
                      <SidebarItemCollapse
                        key={navKey}
                        name={nv.name}
                        icon={nv.icon}
                        links={nv.navSubItems}
                      />
                    );
                  }
                  return (
                    <SidebarItem
                      name={nv.name}
                      icon={nv.icon}
                      href={nv?.href ?? '#/'}
                      key={navKey}
                      badge={nv.badge}
                      disabled={nv.disabled}
                      bagdeColor={nv.bagdeColor}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </ul>
        <SidebarCta />
      </SimpleBar>
    </nav>
  );
}
