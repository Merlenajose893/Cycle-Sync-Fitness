import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// These imports will be updated to feature barrel exports after auth migration
import { UserAuthProvider } from "../../context/UserAuthContext";
import { TrainerAuthprovider } from "../../context/TrainerAuthContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Composes all application-level context providers.
 * Centralised here to keep main.tsx clean and make provider
 * ordering explicit.
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserAuthProvider>
        <TrainerAuthprovider>
          {children}
        </TrainerAuthprovider>
      </UserAuthProvider>
    </GoogleOAuthProvider>
  );
};
