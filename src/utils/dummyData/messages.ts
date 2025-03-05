import { IMessage } from '@utils/interfaces';

const messagesData: IMessage[] = [
  {
    id: '1',
    title: 'Vannesa Tucker',
    message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. ',
    timestamp: new Date('2023-03-21T09:00:00Z'),
    read: false,
    image: '/img/avatars/avatar-5.jpg',
  },
  {
    id: '2',
    title: 'William Harris',
    message:
      'Saepe ipsam doloremque aliquam deleniti. Sapiente quidem corporis voluptatum accusamus, voluptate deserunt?',
    timestamp: new Date('2023-03-21T13:30:00Z'),
    read: true,
    image: '/img/avatars/avatar-2.jpg',
  },
  {
    id: '3',
    title: 'Christina Masson',
    message: 'risus in hendrerit gravida rutrum quisque non tellus orci ac',
    timestamp: new Date('2023-03-21T17:45:00Z'),
    read: false,
    image: '/img/avatars/avatar-4.jpg',
  },
  {
    id: '4',
    title: 'Sharon Lessman',
    message: 'A new version of the product is now available',
    timestamp: new Date('2023-03-21T11:15:00Z'),
    read: true,
    image: '/img/avatars/avatar-3.jpg',
  },
];

export default messagesData;
