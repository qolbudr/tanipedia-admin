import { INotification } from '@utils/interfaces';

const notificationsData: INotification[] = [
  {
    id: '1',
    title: 'New message',
    message: 'You have received a new message from John',
    timestamp: new Date('2023-03-20T09:00:00Z'),
    read: false,
    icon: 'Bell',
    iconColor: 'warning',
  },
  {
    id: '2',
    title: 'Payment received',
    message: 'You have received a payment of $100 from Jane',
    timestamp: new Date('2023-03-19T13:30:00Z'),
    read: true,
    icon: 'DollarSign',
    iconColor: 'success',
  },
  {
    id: '3',
    title: 'New follower',
    message: 'You have a new follower on Instagram',
    timestamp: new Date('2023-03-18T17:45:00Z'),
    read: false,
    icon: 'UserPlus',
    iconColor: 'primary',
  },
  {
    id: '4',
    title: 'Product update',
    message: 'A new version of the product is now available',
    timestamp: new Date('2023-03-17T11:15:00Z'),
    read: true,
    icon: 'RefreshCw',
    iconColor: 'info',
  },
  {
    id: '5',
    title: 'Account verification',
    message: 'Please verify your account to access premium features',
    timestamp: new Date('2023-03-16T08:00:00Z'),
    read: false,
    icon: 'Shield',
    iconColor: 'danger',
  },
];

export default notificationsData;
