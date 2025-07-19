// ✅ api.ts
import { API_ENDPOINTS, HTTP_METHODS } from "../constants/api";
import {TOKENS} from  "../constants/general";  
import {
  AuthResponse
} from "../interfaces/auth"
import type { GetContactsResponse, EmergencyContact } from "../interfaces/emergency";

// export const API_BASE_URL = "http://localhost:8080"
export const API_BASE_URL = "https://emciudonduam25vzxaul3gwefy0yqsaz.lambda-url.ap-south-1.on.aws"


export const apiCall = async (
  endpoint: string,
  method = HTTP_METHODS.GET,
  body?: unknown,
  retry = true
): Promise<AuthResponse> => {
  const accessToken = localStorage.getItem(TOKENS.ACCESSTOKEN);
  // Only LOGIN, REGISTER, and REFRESH don't require authentication
  // LOGOUT and ME require authentication
  const isAuthEndpoint = endpoint === API_ENDPOINTS.AUTH.LOGIN || 
                        endpoint === API_ENDPOINTS.AUTH.REGISTER || 
                        endpoint === API_ENDPOINTS.AUTH.GOOGLE || 
                        endpoint === API_ENDPOINTS.AUTH.REFRESH;

  const alwaysAuthEndpoints = ["/api/score/submit"];
  const shouldSendAuth = (accessToken && (!isAuthEndpoint || alwaysAuthEndpoints.includes(endpoint)));

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(shouldSendAuth && { "Authorization": `Bearer ${accessToken}` }),
    },
    // IMPORTANT: 'include' sends cookies with cross-origin requests (if CORS allows)
    credentials: 'include',
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    
    // Only attempt token refresh for authenticated endpoints that fail with 401/403
    // Don't refresh for login/register endpoints as they don't require authentication
    if ((response.status === 401 || response.status === 403) && retry && !isAuthEndpoint && accessToken) {
      // You might want to trigger a logout or redirect to login here
      console.error("Authentication required or session expired.");
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        localStorage.setItem(TOKENS.ACCESSTOKEN, newAccessToken);

        // Retry request once
        return apiCall(endpoint, method, body, false);
      } else {
        throw new Error("Session expired. Please login again.");
      }
    }
    
    // Handle error response - try to parse JSON, fallback to status text
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData: AuthResponse = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (parseError) {
      console.log(parseError)
      // If JSON parsing fails, use status text
      errorMessage = response.statusText || errorMessage;
    }
    
    throw new Error(errorMessage);
  }

  return response.json();
}

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem(TOKENS.REFRESHTOKEN);
  if (!refreshToken) {
    console.error("No refresh token found.");
    return null;  
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
      method: HTTP_METHODS.POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "refreshToken" : refreshToken }),
      credentials: 'include'
    });

    if (!response.ok) {
      
      console.error("Failed to refresh access token.");
      return null;
    }

    const data = await response.json();
    if (data.tokens.accessToken) {
      localStorage.setItem(TOKENS.ACCESSTOKEN, data.tokens.accessToken);
      localStorage.setItem(TOKENS.REFRESHTOKEN, data.tokens.refreshToken);
      if (data.tokens.expiresIn) {
        const accessTokenExpiry = Date.now() + (data.tokens.expiresIn * 1000);
        localStorage.setItem(TOKENS.ACCESS_TOKEN_EXPIRY, accessTokenExpiry.toString());
      }
      return data.tokens.accessToken;
    }

    return null;
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
};

export const getEmergencyContactsApi = async (): Promise<EmergencyContact[]> => {
  try {
    const response = await apiCall(API_ENDPOINTS.EMERGENCY_CONTACTS.GET(), HTTP_METHODS.GET) as unknown as GetContactsResponse;
    // Assuming the response contains a 'contacts' array
    return response.contacts || [];
  } catch (error) {
    console.error('Failed to fetch emergency contacts:', error);
    return [];
  }
};
