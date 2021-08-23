import { AdultSubscription } from './adultSubscription.model';
import { KidSubscription } from './kidSubscription.model';

export interface User {
  _id?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  profileImagePath?: string;
  subscriptionAssociated?: Array<AdultSubscription[] | KidSubscription[]>;
  signUpDate: Date;
  totalPrice?: number;
  paymentMade?: boolean;
  paymentMethod?: string;
  paymentDate?: Date;
  checkAmount: number;
  cashAmount: number;
  holidayCheckAmount: number;
  pass92Amount: number;
  cardAmount: number;
  extraInfo: string;
  token: any; // StripeCheckoutOptions;
}
