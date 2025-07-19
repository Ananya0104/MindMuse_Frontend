import { API_ENDPOINTS, HTTP_METHODS } from "../../constants/api";
import { apiCall } from "../../lib/api";
import { getCurrentUserId } from "../../lib/auth";
import type { EmergencyContact , GetContactsResponse, CreateOrUpdateContactsResponse} from "../../interfaces/emergency";
import { formatEmergencyContacts } from "../../lib/emergency_utils";

export async function getEmergencyContacts(): Promise<EmergencyContact[]> {
  const userId = getCurrentUserId();
  if (!userId) throw new Error("User not authenticated");
  try {
    const endpoint = `${API_ENDPOINTS.EMERGENCY_CONTACTS.GET()}?userId=${userId}`;
    const response = await apiCall(endpoint, HTTP_METHODS.GET);
    // Log the response for debugging
    console.log("Fetched emergency contacts:", response);
    return ((response as unknown) as GetContactsResponse).contacts || [];
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching emergency contacts:", error);
    // Optionally, show a user-friendly error or return []
    return [];
  }
}

export async function createOrUpdateEmergencyContacts(contacts: EmergencyContact[]): Promise<CreateOrUpdateContactsResponse> {
  const userId = getCurrentUserId();
  if (!userId) throw new Error("User not authenticated");
  const formattedContacts = formatEmergencyContacts(contacts);
  if (formattedContacts.length < 1) {
    throw new Error("At least 1 emergency contact is required");
  }
  if (formattedContacts.length > 3) {
    throw new Error("No more than 3 emergency contacts allowed");
  }
  const endpoint = `${API_ENDPOINTS.EMERGENCY_CONTACTS.CREATE_OR_UPDATE()}?userId=${userId}`;
  const response = await apiCall(endpoint, HTTP_METHODS.POST, { contacts: formattedContacts });
  return (response as unknown) as CreateOrUpdateContactsResponse;
}