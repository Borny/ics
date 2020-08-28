import { AgeGroups } from './ageGroup.enum';

export interface KidsFormData {
  ageGroup: AgeGroups;
  locations?: string[];
  firstName: string;
  lastName: string;
  birthdate: string;
  guardianLastName: string;
  guardianFirstName: string;
  email: string;
  phone: string;
  secondGuardianLastName?: string;
  secondGuardianFirstName?: string;
  secondGuardianEmail?: string;
  secondGuardianPhone?: string;
  imageRights?: boolean;
  extraInfo?: string;
}
