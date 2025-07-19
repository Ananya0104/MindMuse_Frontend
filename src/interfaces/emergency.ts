export interface EmergencyContact {
    name: string
    email: string
    countryCode: string
    phoneNumber: string
    relationship: string
  }
  

export interface CountryCode {
    code: string
    name: string
    flag: string
  }
  

// Add response interfaces
export interface GetContactsResponse {
  contacts?: EmergencyContact[];
  [key: string]: unknown;
}

export interface CreateOrUpdateContactsResponse {
  message?: string;
  UserId?: string;
  contacts?: EmergencyContact[];
  [key: string]: unknown;
}

export interface DeleteContactResponse {
  message?: string;
  success?: boolean;
  [key: string]: unknown;
}