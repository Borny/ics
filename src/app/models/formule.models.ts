import { AgeGroupEnum } from './age-group.enum';
import { KidAgeEnum } from './kid-age.enum';

export interface Formule {
  _id?: string;
  checked?: boolean;
  title: string;
  ageGroup: AgeGroupEnum;
  kidAge?: KidAgeEnum;
  price: number;
  schedules: Schedule[];
  street: string;
  location: string;
  hasCoupon: boolean;
  couponCode: string;
  couponValue: number;
  showCoupon: boolean;
  couponInput: string;
  formuleCount: number;
  physicalClass: boolean;
  onlineAccess: boolean;
  graduation: boolean;
  index?: number;
}

export interface Schedule {
  day: string;
  time: string;
}
