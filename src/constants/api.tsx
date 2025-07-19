export const API_ENDPOINTS = {
  USERS: "/api/users",
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    REFRESH: "/api/auth/refresh",
    GOOGLE: "/api/auth/google",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },
  JOURNAL: {
    BASE: "/api/journals",
    CREATE: "/api/journals",
    GET_ALL: "/api/journals",
    GET_BY_ID: (id: string | number) => `/api/journals/${id}`,
    UPDATE: (id: string | number) => `/api/journals/${id}`,
    DELETE: (id: string | number) => `/api/journals/${id}`
  },
  EMERGENCY_CONTACTS: {
    BASE: "/api/emergency",
    CREATE_OR_UPDATE: () => "/api/emergency/create",
    GET: () => "/api/emergency/contacts"
  },
  BUDDY_TYPE: {
    FINETUNED: "gabu-nika-stream",
    RAG: "chat-stream",
  }
}


export const API_KEYS = {
  STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, // Example for environment variable
  Maps_API_KEY: process.env.NEXT_PUBLIC_Maps_API_KEY,
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};


