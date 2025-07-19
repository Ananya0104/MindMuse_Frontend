"use client"
import SurveyPage from "@/app/survey/Survey-Page"
import { UI_LABELS } from "@/constants/general";
import { APP_ROUTES } from "@/constants/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";


export default function Page() {
  const isLoadingAuth = useAuthRedirect(APP_ROUTES.DASHBOARD, APP_ROUTES.AUTH.LOGIN, true);
  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{UI_LABELS.LOADING} Checking authentication...</p>
      </div>
    );
  }
  return (
    <>
      <SurveyPage />
    </>
  )
}
