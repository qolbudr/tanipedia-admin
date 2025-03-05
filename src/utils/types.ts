import themeConfigs from '@configs/themeConfigs';
import * as RFIcon from 'react-feather';

export type FeatherIconsTypes = keyof typeof RFIcon;
export type ThemeTypes = keyof typeof themeConfigs;
export type NotificationVariantTypes =
  | 'primary'
  | 'success'
  | 'danger'
  | 'info'
  | 'warning';
