import { User } from "@/interfaces/user"

export interface TokenPair {
  accessToken: string
  refreshToken: string
  expiresIn : number
	tokenType : string

}
  
export interface AuthResponse {
  success: boolean
  message?: string
  user?: User
  tokens?: TokenPair
}

export interface ApiError {
    message: string
  }

export interface ApiResponse {
    success: boolean
    message?: string
    status?: string
  }
  
