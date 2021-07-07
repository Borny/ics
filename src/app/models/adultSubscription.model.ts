export interface AdultSubscription {
  _id: string;
  memberLastName: string;
  memberFirstName: string;
  birthdate: string;
  gender: string;
  phone: string;
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
