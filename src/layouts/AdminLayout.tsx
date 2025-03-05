/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';

type Props = {
  children: React.ReactNode;
};

function AdminLayout({ children }: Props) {
  React.useEffect(() => {
    const __nextEL = document.getElementById('__next') as HTMLDivElement;
    __nextEL.classList.add('wrapper');

    return () => {
      __nextEL.classList.remove('wrapper');
    };
  }, []);

  return (
    <>
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">{children}</main>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default AdminLayout;
