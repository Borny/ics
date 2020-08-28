import { SubscriptionType } from './subscriptionType.enum';

export interface ClassDeals {
  title: string;
  option: string;
  description: string;
  price: number;
  subscriptionType: SubscriptionType;
}
