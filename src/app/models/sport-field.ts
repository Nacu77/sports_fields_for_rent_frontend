import { Address } from './address';
import { Schedule } from './schedule';

export interface SportField {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  address: Address;
  rating: number;
  schedule: Schedule;
}
