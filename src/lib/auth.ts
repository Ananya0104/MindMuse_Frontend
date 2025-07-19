import { TOKENS } from "@/constants/general";
import { User } from "@/interfaces/user";
import { refreshAccessToken } from "@/lib/api";

/**
 * Check if user is authenticated using localStorage data
 * @returns {Promise<boolean>} true if user is authenticated, false otherwise
 */
export const isAuthenticated = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  const accessToken = localStorage.getItem(TOKENS.ACCESSTOKEN);
  const userData = localStorage.getItem(TOKENS.USER_DATA);
  const accessTokenExpiry = localStorage.getItem(TOKENS.ACCESS_TOKEN_EXPIRY);
  
  // Check if we have all required data
  if (!accessToken || !userData || !accessTokenExpiry) {
    return false;
  }
  
  // Check if access token has expired
  const expiryTime = parseInt(accessTokenExpiry);
  if (Date.now() > expiryTime) {
    // Try to refresh the token
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Token refreshed successfully, update expiry and return true
      return true;
    } else {
      // Token refresh failed, clear localStorage
      clearAuthData();
      return false;
    }
  }
  
  return true;
};

/**
 * Get current user data from localStorage
 * @returns {User | null} user data or null if not found/invalid
 */
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem(TOKENS.USER_DATA);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get current user ID from localStorage
 * @returns {string | null} user ID or null if not found
 */
export const getCurrentUserId = (): string | null => {
  const user = getCurrentUser();
  return user?.userId || null;
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(TOKENS.ACCESSTOKEN);
  localStorage.removeItem(TOKENS.REFRESHTOKEN);
  localStorage.removeItem(TOKENS.USER_DATA);
  localStorage.removeItem(TOKENS.ACCESS_TOKEN_EXPIRY);
}; 