/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { AuthCtxProvider } from '@utils/context/AuthContext';

type Props = {
  children: React.ReactNode;
};

function AdminLayout({ children }: Props) {
  return (
    <>
      <AuthCtxProvider>
        <Sidebar />
        <div className="main">
          <Navbar />
          <main className="content">{children}</main>
          {/* Footer */}
          <Footer />
        </div>
      </AuthCtxProvider>
    </>
  );
}

export default AdminLayout;
