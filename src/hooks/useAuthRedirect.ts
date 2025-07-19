"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '../constants/navigation';
import { isAuthenticated } from '../lib/auth';

/**
 * A Next.js hook for handling authentication-based redirects.
 *
 * This hook checks the user's authentication status using localStorage data.
 * It provides flexible redirection options based on the authentication status.
 *
 * @param redirectPath - The path to redirect to if authentication is successful
 * and `shouldStayOnPageOnAuthSuccess` is false.
 * Defaults to `APP_ROUTES.DASHBOARD`.
 * @param onAuthFailRedirectPath - An optional path to redirect to if authentication fails.
 * If not provided, the user will stay on the current page on auth failure.
 * @param shouldStayOnPageOnAuthSuccess - An optional boolean. If true, the user will
 * stay on the current page even if authentication is successful,
 * ignoring `redirectPath`. Defaults to `false`.
 * @returns isLoading - A boolean indicating whether the authentication check and redirection logic
 * are currently in progress. This can be used to show a loading spinner.
 * 
 * LOGIN 
 * Auth success - logged in - redirect to Dashboard
 * Auth fail - logged out - stay where you are
 * 
 * SIGNUP 
 * Auth success - logged in - redirect to Dashboard
 * Auth fail - logged out - stay where you are
 * 
 * DASHBOARD and other Pages of app
 * Auth success - logged in - stay where you are
 * Auth fail - logged out - redirect to LOGIN
 */
export const useAuthRedirect = (
  redirectPath: string = APP_ROUTES.DASHBOARD,
  onAuthFailRedirectPath?: string,
  shouldStayOnPageOnAuthSuccess: boolean = false
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      setIsLoading(true); // Start loading

      const isAuth = await isAuthenticated();

      if (isAuth) {
        // If the user is authenticated
          if (shouldStayOnPageOnAuthSuccess) {
          console.log('User authenticated, staying on current page as requested.');
            setIsLoading(false); // Authentication check complete, user stays on page
          } else {
          console.log('User authenticated, redirecting to:', redirectPath);
            router.replace(redirectPath); // `replace` prevents going back to login via browser back button
            // isLoading remains true as component will unmount on redirect
          }
        } else {
        // No valid session found
        console.log('No valid session found in localStorage.');
          if (onAuthFailRedirectPath) {
            console.log('Redirecting to auth fail path:', onAuthFailRedirectPath);
            router.replace(onAuthFailRedirectPath);
            // isLoading remains true as component will unmount on redirect
          } else {
            console.log('Staying on current page as no auth fail redirect path provided.');
          setIsLoading(false); // Authentication check complete, user stays on page
        }
      }
    };

    checkAuthAndRedirect();
  }, [router, redirectPath, onAuthFailRedirectPath, shouldStayOnPageOnAuthSuccess]); // Dependencies: router and all params

  return isLoading;
};