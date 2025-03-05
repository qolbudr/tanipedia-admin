/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import messagesData from '@utils/dummyData/messages';
import notificationsData from '@utils/dummyData/notifications';
import { IMessage, INotification } from '@utils/interfaces';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react';

type AdminLayoutType = {
  openSidebar: boolean;
  notifications: INotification[];
  messages: IMessage[];
  onToggleSidebar: () => void;
};

const adminLayoutContextDefaultValues: AdminLayoutType = {
  openSidebar: true,
  notifications: [],
  messages: [],
  onToggleSidebar: () => {},
};

export const AdminLayout = createContext<AdminLayoutType>(
  adminLayoutContextDefaultValues
);

export function useAdminLayoutContext() {
  const context = useContext(AdminLayout);
  if (context === undefined) {
    throw new Error('useAdminLayout must wrapper in the provider');
  }

  return context;
}

type Props = {
  children: ReactNode;
};

export function AdminLayoutCtxProvider({ children }: Props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const onToggleSidebar = useCallback(() => {
    setOpenSidebar(!openSidebar);
  }, [openSidebar]);

  const value: AdminLayoutType = useMemo(
    () => ({
      openSidebar,
      onToggleSidebar,
      messages: messagesData,
      notifications: notificationsData,
    }),
    [openSidebar, onToggleSidebar]
  );

  return <AdminLayout.Provider value={value}>{children}</AdminLayout.Provider>;
}
