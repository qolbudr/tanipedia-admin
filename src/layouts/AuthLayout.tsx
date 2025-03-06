import { GuestCtxProvider } from '@utils/context/GuestContext';
import React from 'react';
import { Container } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <GuestCtxProvider>
      <main className="d-flex w-100 bg-bg-light ">
        <Container className=" d-flex flex-column">{children}</Container>
      </main>
    </GuestCtxProvider>
  );
}

export default AuthLayout;
