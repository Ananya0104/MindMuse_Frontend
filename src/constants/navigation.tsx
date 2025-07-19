export const APP_ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  ORDERS: "/orders",
  ORDER_DETAIL: (id: string | number) => `/orders/${id}`,
  SETTINGS: "/settings",
  PROFILE: "/profile",
  ABOUT: "/about",
  EMERGENCY: "/emergency",
  CONTACT: "/contact",
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
  },
  JOURNAL: {
    ROOT: "/journal",
    ENTRIES: "/journal/entries",
    WRITE: "/journal/new-entry",
    ENTRY_DETAIL: (id: string | number) => `/journal/entries/${id}`,
    ENTRY_EDIT: (id: string | number) => `/journal/entries/${id}/edit`,
  },
  BUDDY: "/buddy",
  SURVEY: "/survey"
}
// External links to be used in the UI codebase
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/your-username/your-repo',
  TWITTER: 'https://twitter.com/your-twitter-handle',
  LINKEDIN: 'https://linkedin.com/in/your-linkedin-profile',
  PRIVACY_POLICY: 'https://example.com/privacy-policy',
};