import React from "react";
import { useEffect } from "react";
import "../css/components/header.css";
import { useAuth } from "../hooks/auth";

export default function Header() {
  const { userInfo, logout } = useAuth();
  const show = (id, hideid) => {
    document.getElementById(id).classList.remove("none");
    document.getElementById(hideid).classList.add("none");
  };
  const logoutToggle = () => {
    document.querySelector(".logoutpopup").classList.toggle("none");
  };
  return (
    <div className="header">
      {!userInfo.firstRender && (
        <>
          <h1 className="logo">Live Chat</h1>
          {!userInfo.isLoggedIn && (
            <div className="btns">
              <div
                className="btn"
                onClick={() => {
                  show("login", "signin");
                }}
              >
                Login
              </div>
              <div
                className="btn"
                onClick={() => {
                  show("signin", "login");
                }}
              >
                SignIn
              </div>
            </div>
          )}

          {userInfo.isLoggedIn && (
            <div className="info">
              <img
                className="info__img pointer"
                src={"http://localhost:1111" + userInfo.image}
                alt="avatar"
                onClick={logoutToggle}
              />
              <h1 className="info__username pointer" onClick={logoutToggle}>
                {userInfo.username}
              </h1>
              <div className="logoutpopup none">
                <div className="logoutpopup__btn" onClick={logout}>
                  Logout
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
