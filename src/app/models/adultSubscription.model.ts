export interface AdultSubscription {
  _id: string;
  memberLastName: string;
  memberFirstName: string;
  birthdate: string;
  gender: string;
  phone: number;
  renew: string;
  extraInfo: string;
  formuleId: string;
  couponCodeValid?: boolean;
  couponValue?: number;
  subscriptionAmount: number;
  subscriptionDate: Date;
}
