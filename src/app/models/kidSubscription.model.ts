import { User } from './user.model';

export interface KidSubscription {
  _id: string;
  memberLastName: string;
  memberFirstName: string;
  birthdate: string;
  gender: string;
  guardianLastName: string;
  guardianFirstName: string;
  guardianEmail: string;
  guardianPhone: string;
  secondGuardianLastName?: string;
  secondGuardianFirstName?: string;
  secondGuardianEmail?: string;
  secondGuardianPhone?: string;
  renew: string;
  extraInfo: string;
  imageRights: string;
  formuleId: string;
  couponCodeValid?: boolean;
  couponValue?: number;
  subscriptionAmount: number;
  subscriptionDate: Date;
  userEmail: string;
}
