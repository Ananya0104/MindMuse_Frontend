export interface LoginFormProps {
    formData: {
      email: string
      password: string
    }
    setFormData: React.Dispatch<
      React.SetStateAction<{
        email: string
        password: string
      }>
    >
    handleSubmit: (e: React.FormEvent) => Promise<void>
    loading: boolean
    error: string
    success: string
  }
  