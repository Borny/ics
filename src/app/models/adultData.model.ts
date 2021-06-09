import { Formule } from './formule.models';

export interface AdultSubscription {
  _id: string;
  lastName: string;
  firstName: string;
  birthdate: string;
  gender: string;
  email?: string;
  password?: string;
  phone: number;
  renew: boolean;
  extraInfo: string;
  formule: Formule;
}
