import {CountryCode}  from "@/interfaces/user"

export interface SignupFormProps {
    formData: {
      fullName: string
      email: string
      countryCode: string
      phoneNumber: string
      password: string
      dob: string
    }
    setFormData: React.Dispatch<
      React.SetStateAction<{
        fullName: string
        email: string
        countryCode: string
        phoneNumber: string
        password: string
        dob: string
      }>
    >
    handleSubmit: (e: React.FormEvent) => Promise<void>
    loading: boolean
    error: string
    success: string
    countryCodes: CountryCode[]
  }