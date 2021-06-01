import { AgeGroupEnum } from './age-group.enum';

export interface Formule {
  _id?: string;
  checked?: boolean;
  title: string;
  ageGroup: AgeGroupEnum;
  price: number;
  details: string;
  coupon: boolean;
}
