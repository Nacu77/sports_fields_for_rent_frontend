import { Address } from './address';
import { Image } from './image';
import { Schedule } from './schedule';

export interface SportField {
  id: string;
  createdBy: string | null;
  name: string;
  description: string;
  pricePerHour: number;
  address: Address;
  rating: number;
  schedule: Schedule;
  primaryImageName: string;
  primaryImage: Image;
  type: SportFieldType;
}

export enum SportFieldType {
  FOOTBALL = 'Football field',
  BASKETBALL = 'Basketball field',
  TENNIS = 'Tennis field',
}
