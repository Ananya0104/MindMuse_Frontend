export const ERROR_MESSAGES = {
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  AUTH: {
    INVALID_CREDENTIALS: 'The email or password you entered is incorrect.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    UNAUTHORIZED_ACCESS: 'You do not have permission to access this resource.',
    USER_ID_UNDETERMINED: 'Unable to determine current user ID - user not authenticated',
  },
  FORM_VALIDATION: {
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    PASSWORD_TOO_SHORT: (min: number) => `Password must be at least ${min} characters long.`,
    PASSWORD_MISMATCH: 'Passwords do not match.',
  },
  DATA_FETCHING: {
    NOT_FOUND: (resource: string) => `${resource} not found.`,
    FAILED_TO_LOAD: (resource: string) => `Failed to load ${resource}.`,
  },
  JOURNAL: {
    FAILED_TO_CREATE: 'Failed to create journal entry',
    FAILED_TO_FETCH: 'Failed to fetch journal entries',
    FAILED_TO_UPDATE: 'Failed to update journal entry',
    FAILED_TO_DELETE: 'Failed to delete journal entry',
    FILL_TITLE_CONTENT: 'Please fill in both title and content',
    UNABLE_TO_LOAD: 'Unable to load journal entry',
    UNABLE_TO_LOAD_ALL: 'Unable to load journal entries',
    FAILED_TO_SAVE: 'Failed to save journal entry',
    FAILED_TO_DELETE_ENTRY: 'Failed to delete entry',
  },
};

export const EMERGENCY = {
  NAME_REQUIRED: (index: number) => `Emergency Contact ${index + 1}: Name is required`,
  EMAIL_REQUIRED: (index: number) => `Emergency Contact ${index + 1}: Email is required`,
  PHONE_REQUIRED: (index: number) => `Emergency Contact ${index + 1}: Phone number is required`,
  RELATIONSHIP_REQUIRED: (index: number) => `Emergency Contact ${index + 1}: Relationship is required`,
  TERMS_REQUIRED: "Please agree to Terms & Conditions and Privacy Policy",
  USER_NOT_AUTHENTICATED: "User not authenticated",
  FAILED_TO_SAVE: (msg?: string) => `Failed to save emergency contacts: ${msg || ''}`,
  DUPLICATE_PHONE: (index1: number, index2: number) => `Phone number is duplicated between Emergency Contact ${index1 + 1} and ${index2 + 1}`,
};