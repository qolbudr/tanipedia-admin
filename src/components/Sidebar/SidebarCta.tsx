import React from 'react';

type Props = {};

function SidebarCta({}: Props) {
  return (
    <div className="sidebar-cta">
      <div className="sidebar-cta-content">
        <strong className="d-inline-block mb-2">Upgrade to Pro</strong>
        <div className="mb-3 text-sm">
          Are you looking for more components? Check out our premium version.
        </div>
        <div className="d-grid">
          <a
            href="https://demo.adminkit.io/"
            target="_blank"
            className="btn btn-primary"
          >
            Upgrade to Pro
          </a>
        </div>
      </div>
    </div>
  );
}

export default SidebarCta;
