"use client"
import { apiCall } from "./api";
import { API_ENDPOINTS, HTTP_METHODS } from "../constants/api";
import type { User } from "../interfaces/user";

// Add update and delete user functions
export async function updateUserProfile(profileData: Partial<User>) {
  return apiCall(API_ENDPOINTS.AUTH.ME, HTTP_METHODS.PATCH, profileData);
}

export async function deleteUserAccount() {
  if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
  try {
    await apiCall(API_ENDPOINTS.AUTH.ME, HTTP_METHODS.DELETE);
    window.location.href = '/';
  } catch (error) {
    console.log(error);
    alert('Failed to delete account');
  }
}