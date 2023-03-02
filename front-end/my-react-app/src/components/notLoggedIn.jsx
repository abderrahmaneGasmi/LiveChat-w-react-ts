import React from "react";
import { useState } from "react";
import "../css/components/notloggedin.css";
import { addUser } from "../util/ModuleFetch";
import { useNotification } from "../hooks/notification";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";
export default function NotLoggedInContainer() {
  const { updateNotification } = useNotification();
  const { logIn, userInfo } = useAuth();
  const navigate = useNavigate();
  const [LoginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [SignInInfo, setSignInInfo] = useState({
    username: "",
    password: "",
    image: undefined,
  });

  const handlechangeLogin = async ({ target }) => {
    // we are merging the input value to user info so when a user press a key we  update the userinfo variable
    const { value, name } = target;
    // this is to test if the input that get changed is the three fields which is semestre and year and deparetmnt or the other fields
    setLoginInfo({ ...LoginInfo, [name]: value });
  };
  const handlechangeSignin = async ({ target }) => {
    // we are merging the input value to user info so when a user press a key we  update the userinfo variable
    const { value, name } = target;
    if (name == "image") {
      setSignInInfo({ ...SignInInfo, image: target.files[0] });
    }
    // this is to test if the input that get changed is the three fields which is semestre and year and deparetmnt or the other fields
    else setSignInInfo({ ...SignInInfo, [name]: value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (LoginInfo.username == "")
      return updateNotification("error", "Please enter a username");
    if (LoginInfo.password == "")
      return updateNotification("error", "Please enter a password");

    let t = await logIn(LoginInfo);
    if (t) navigate("/chat");
  };
  const handleSubmitSignin = async (e) => {
    e.preventDefault();

    if (SignInInfo.username == "")
      return updateNotification("error", "Please enter a username");
    if (SignInInfo.password == "")
      return updateNotification("error", "Please enter a password");
    if (typeof SignInInfo.image == "undefined")
      return updateNotification("error", "Please select an image");

    if (
      SignInInfo.image.type != "image/jpeg" &&
      SignInInfo.image.type != "image/png" &&
      SignInInfo.image.type != "image/jpg"
    )
      return updateNotification("error", "Please select an image");
    let Formdata = new FormData();

    Formdata.append("file", SignInInfo.image);
    Formdata.append("username", SignInInfo.username);
    Formdata.append("password", SignInInfo.password);

    let { error, data } = await addUser(Formdata);
    if (error) {
      updateNotification("error", error);
    } else {
      updateNotification("success", data.response);
    }
  };
  const close = (id) => {
    document.getElementById(id).classList.add("none");
  };
  useEffect(() => {
    if (userInfo.isLoggedIn) {
      navigate("/chat");
    }
  }, [userInfo]);

  return (
    <div className="notloggedin">
      {!userInfo.isLoggedIn && !userInfo.firstRender && (
        <>
          <div className="title">
            Welcome To Live chat Using Socket.Io{" "}
            <span> This is only a demo</span>
          </div>

          <div className="popup none" id="login">
            <form onSubmit={handleSubmitLogin} className="popupForm">
              <div className="inputGroup">
                <label htmlFor="name">username</label>
                <input
                  type="text"
                  value={LoginInfo.username}
                  name="username"
                  onChange={handlechangeLogin}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={LoginInfo.password}
                  name="password"
                  onChange={handlechangeLogin}
                />
              </div>
              <div
                className="close"
                onClick={() => {
                  close("login");
                }}
              >
                X
              </div>
              <button className="submitbtn" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="popup none" id="signin">
            <form onSubmit={handleSubmitSignin} className="popupForm">
              <div className="inputGroup">
                <label htmlFor="name">username</label>
                <input
                  type="text"
                  value={SignInInfo.username}
                  name="username"
                  onChange={handlechangeSignin}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={SignInInfo.password}
                  name="password"
                  onChange={handlechangeSignin}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="password">Avatar Image</label>
                <input type="file" name="image" onChange={handlechangeSignin} />
              </div>
              <div
                className="close"
                onClick={() => {
                  close("signin");
                }}
              >
                X
              </div>
              <button className="submitbtn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
