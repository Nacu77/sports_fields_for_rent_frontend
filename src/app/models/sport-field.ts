import { Address } from './address';

export interface SportField {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  address: Address;
  rating: number;
}
