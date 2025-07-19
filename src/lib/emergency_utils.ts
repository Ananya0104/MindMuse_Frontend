import type { EmergencyContact } from "@/interfaces/emergency"
import { TOKENS } from "@/constants/general";
import { APP_ROUTES } from "@/constants/navigation";
import { getEmergencyContactsApi } from "@/lib/api";
import type { AuthResponse } from "@/interfaces/auth";
import type { useRouter } from "next/navigation";

type EmergencyContactWithPhone = EmergencyContact & { phone?: string };

// Utility function to format emergency contacts
export function formatEmergencyContacts(contacts: EmergencyContactWithPhone[]) {
    return contacts.map((contact) => ({
      name: contact.name?.trim() || "",
      email: contact.email?.trim() || "",
      phone: (contact.phone ? contact.phone : `${contact.countryCode || ""}${contact.phoneNumber || ""}`).trim(),
      relationship: contact.relationship?.trim() || "",
    }))
  }
  
export async function handleAuthResponse(
  apiResponse: AuthResponse,
  router: ReturnType<typeof useRouter>,
  setSuccess?: (msg: string) => void
) {
  if (apiResponse.tokens) {
    localStorage.setItem(TOKENS.ACCESSTOKEN, apiResponse.tokens.accessToken);
    localStorage.setItem(TOKENS.REFRESHTOKEN, apiResponse.tokens.refreshToken);
    const accessTokenExpiry = Date.now() + (apiResponse.tokens.expiresIn ? apiResponse.tokens.expiresIn * 1000 : 60 * 60 * 1000);
    localStorage.setItem(TOKENS.ACCESS_TOKEN_EXPIRY, accessTokenExpiry.toString());
  }
  if (apiResponse.user) {
    localStorage.setItem(TOKENS.USER_DATA, JSON.stringify(apiResponse.user));
  }
  if (setSuccess) setSuccess("Signup/Login successful! 🎉");

  try {
    // First, check localStorage user data
    const userData = localStorage.getItem(TOKENS.USER_DATA);
    if (userData) {
      const user = JSON.parse(userData);
      const localContacts = formatEmergencyContacts(user.emergencyContacts || []);
      console.log("Contacts from localStorage user:", localContacts);
      const hasLocalValidContact = Array.isArray(localContacts) && localContacts.some(
        contact =>
          contact.name &&
          contact.email &&
          contact.phone &&
          contact.relationship
      );
      if (hasLocalValidContact) {
        router.replace(APP_ROUTES.DASHBOARD);
        return;
      }
    }
    // Fallback: call API
    const rawContacts = await getEmergencyContactsApi();
    console.log("Raw contacts from API:", rawContacts);
    const contacts = formatEmergencyContacts(rawContacts);
    console.log("Formatted contacts:", contacts);
    const hasValidContact = Array.isArray(contacts) && contacts.some(
      contact =>
        contact.name &&
        contact.email &&
        contact.phone &&
        contact.relationship
    );
    if (hasValidContact) {
      router.replace(APP_ROUTES.DASHBOARD);
    } else {
      router.replace(APP_ROUTES.EMERGENCY);
    }
  } catch (e) {
    console.log(e)
    router.replace(APP_ROUTES.EMERGENCY);
  }
}
  