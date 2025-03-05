/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function MiscLayout({ children }: Props) {
  return (
    <main className="d-flex w-100 h-100">
      <div className="container d-flex flex-column">{children}</div>
    </main>
  );
}

export default MiscLayout;
