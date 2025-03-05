/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef, Ref } from 'react';

type DropdownToggleProps = {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
} & React.HTMLProps<HTMLAnchorElement>;

const DropdownToggle = forwardRef<HTMLAnchorElement, DropdownToggleProps>(
  ({ children, onClick, className }, ref: Ref<HTMLAnchorElement>) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className={className}
    >
      {children}
    </a>
  )
);

export default DropdownToggle;
