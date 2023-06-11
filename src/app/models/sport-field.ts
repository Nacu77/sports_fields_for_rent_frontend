import { Address } from './address';

export interface SportField {
  name: string;
  description: string;
  pricePerHour: number;
  address: Address;
  rating: number;
}
