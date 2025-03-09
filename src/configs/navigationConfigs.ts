import { FeatherIconsTypes, ThemeTypes } from '@utils/types';

interface INavigationSubItems {
  name: string;
  href: string;
  badge?: string;
  bagdeColor?: ThemeTypes;
  disabled?: boolean;
}

interface INavigationItem {
  name: string;
  icon: FeatherIconsTypes;
  href?: string;
  disabled?: boolean;
  badge?: string;
  bagdeColor?: ThemeTypes;
  navSubItems?: INavigationSubItems[];
}

interface INavigation {
  [key: string]: {
    title: string;
    navItems: INavigationItem[];
  };
}

const navigationConfigs: INavigation = {
  pages: {
    title: 'Master Data',
    navItems: [
      {
        name: 'Pengguna',
        icon: 'User',
        href: '/user',
      },
      {
        name: 'Edukasi',
        icon: 'Book',
        navSubItems: [
          {
            name: 'Kategori Video',
            href: '/edukasi/video-category',
          },
          {
            name: 'Video',
            href: '/edukasi/video',
          },
          {
            name: 'Artikel',
            href: '/edukasi/artikel',
          },
        ],
      },
      {
        name: 'Pohon Dana',
        icon: 'Info',
        href: '/pohon-dana',
      },
    ],
  },
  sellerPage: {
    title: 'Seller',
    navItems: [
      {
        name: 'Produk',
        icon: 'Book',
        href: '/produk',
      },
      // {
      //   name: 'Pohon Dana',
      //   icon: 'Info',
      //   href: '/master-pohon-dana',
      // },
    ],
  },
  // toolsComponents: {
  //   title: 'Tools & Components',
  //   navItems: [
  //     {
  //       name: 'Auth',
  //       icon: 'Users',
  //       navSubItems: [
  //         {
  //           name: 'Sign In',
  //           href: '/pages-sign-in',
  //         },
  //         {
  //           name: 'Sign Up',
  //           href: '/pages-sign-up',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Blank',
  //       icon: 'Book',
  //       href: '/pages-blank',
  //     },
  //     {
  //       name: 'UI Elements',
  //       icon: 'Briefcase',
  //       navSubItems: [
  //         {
  //           name: 'Alerts',
  //           href: '/ui-alerts',
  //           badge: 'Soon',
  //           disabled: true,
  //         },
  //         {
  //           name: 'Buttons',
  //           href: '/ui-buttons',
  //           badge: 'Soon',
  //           disabled: true,
  //         },
  //         {
  //           name: 'Cards',
  //           href: '/ui-cards',
  //           badge: 'Soon',
  //           disabled: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Forms',
  //       icon: 'CheckSquare',
  //       badge: 'Soon',
  //       disabled: true,
  //       href: '/ui-forms',
  //     },
  //     {
  //       name: 'Icons',
  //       icon: 'Coffee',

  //       href: '/ui-feather',
  //     },
  //   ],
  // },
  // pluginsAddons: {
  //   title: 'Plugins & Addons',
  //   navItems: [
  //     {
  //       name: 'Notification',
  //       icon: 'Bell',
  //       href: '/notification',
  //     },
  //     {
  //       name: 'Table',
  //       icon: 'List',
  //       href: '/tables-react',
  //     },
  //     {
  //       name: 'Charts',
  //       icon: 'BarChart2',
  //       href: '/charts-chartjs',
  //       badge: 'Soon',
  //       disabled: true,
  //     },
  //     {
  //       name: 'Map',
  //       icon: 'Map',
  //       navSubItems: [
  //         {
  //           name: 'Google Map',
  //           href: '/map-google',
  //           badge: 'Soon',
  //           disabled: true,
  //         },
  //         {
  //           name: 'JVectorMap',
  //           href: '/map-jvectormap',
  //           badge: 'Soon',
  //           disabled: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
};

export default navigationConfigs;
