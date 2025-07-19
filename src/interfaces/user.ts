export interface User {
    userId: string
    name?: string
    username?: string
    email?: string
    countryCode?: string
    phone?: string
    googleId?: string
    authMethods: string[]
    isEmailVerified: boolean
    isPhoneVerified: boolean
    tokenVersion: number
    lastActiveAt: number
    createdAt: number
    updatedAt: number
    profilePicture?: string
  }
  
export interface CountryCode {
    code: string
    name: string
    flag: string
  }