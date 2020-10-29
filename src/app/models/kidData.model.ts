export interface KidData {
  _id: string;
  lessonLocations?: string[];
  firstName: string;
  lastName: string;
  birthdate: string;
  guardianLastName: string;
  guardianFirstName: string;
  guardianEmail: string;
  guardianPhone: string;
  secondGuardianLastName?: string;
  secondGuardianFirstName?: string;
  secondGuardianEmail?: string;
  secondGuardianPhone?: string;
  imageRights?: boolean;
  extraInfo?: string;
  firstSubscription: boolean;
}
