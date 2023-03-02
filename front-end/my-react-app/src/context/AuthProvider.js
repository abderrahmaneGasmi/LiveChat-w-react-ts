import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { getUser } from "../util/ModuleFetch";
import { GetisAuth } from "../util/auth";
import { useNotification } from "../hooks/notification";
export const AuthProviderContext = createContext();
const defaultAuthInfo = {
  username: "",
  image: "",
  password: "",
  isLoggedIn: false,
  isPending: false,
  firstRender: true,
};

export default function AuthProvider({ children }) {
  const { updateNotification } = useNotification();
  const [userInfo, setUserInfo] = useState({ ...defaultAuthInfo });
  const logIn = async (LoginInfo) => {
    setUserInfo((prev) => ({ ...prev, isPending: true }));
    const { error, data } = await getUser(LoginInfo);
    setUserInfo((prev) => ({ ...prev, isPending: false }));
    if (error) {
      updateNotification("error", error);
      return false;
    }
    for (const key in data.user) {
      setUserInfo((prev) => ({ ...prev, [key]: data.user[key] }));
    }
    setUserInfo((prev) => ({ ...prev, isLoggedIn: true, firstRender: false }));
    localStorage.setItem("auth-token", data.token);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setUserInfo({ ...defaultAuthInfo, firstRender: false });
  };

  useEffect(() => {
    const isAuth = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        setUserInfo({ ...defaultAuthInfo, firstRender: false });
        return;
      }
      setUserInfo((prev) => ({ ...prev, isPending: true }));
      const { error, user } = await GetisAuth(token);
      setUserInfo((prev) => ({ ...prev, isPending: false }));
      if (error) {
        setUserInfo({ ...userInfo, isLoggedIn: false, firstRender: false });
        updateNotification("error", "please login ");
        return { error: error, userInfo };
      }
      setUserInfo({ ...user, isLoggedIn: true, firstRender: false });

      //
    };
    isAuth();
  }, []);
  return (
    <AuthProviderContext.Provider value={{ userInfo, logIn, logout }}>
      {children}
    </AuthProviderContext.Provider>
  );
}
