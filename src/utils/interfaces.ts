/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import { FeatherIconsTypes, ThemeTypes } from './types';
import { JwtPayload } from 'jsonwebtoken';

export interface INotification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: FeatherIconsTypes;
  iconColor?: ThemeTypes;
}

export interface IProject {
  name: string;
  startDate: string;
  endDate: string;
  status: 'In progress' | 'Done' | 'Cancelled';
  assignedTo: string;
}

export interface IMessage {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  image?: string;
}

export interface IPerson {
  [x: string]: any;
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
  createdAt: Date;
}

export interface IDecodedJwt extends NextRequest {
  user: string | JwtPayload;
}
