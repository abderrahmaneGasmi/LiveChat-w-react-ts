import React from "react";
import NotificationProvider from "./NotificationProvider";
import AuthProvider from "./AuthProvider";
import GlobalVariableProvider from "./GlobalVariable";
export default function ContextProviders({ children }) {
  return (
    <GlobalVariableProvider>
      <NotificationProvider>
        <AuthProvider>{children} </AuthProvider>
      </NotificationProvider>
    </GlobalVariableProvider>
  );
}
