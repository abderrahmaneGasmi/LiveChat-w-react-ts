import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { addChatMessage, getMessages } from "../util/ChatMessage";
import "../css/components/home.css";
import { useNotification } from "../hooks/notification";
import ChatBox from "./ChatBox";
import { useState } from "react";
import { backendServer } from "../Global";
import io from "socket.io-client";
const socket = io.connect("http://localhost:1111");
const sendSvg = "M0 0l20 10-20 10v-20zM0 8v4l10-2-10-2z";

export default function Home() {
  const { userInfo } = useAuth();

  const [typing, setTyping] = useState("");
  const [InputValue, setInputValue] = useState("");
  const { updateNotification } = useNotification();
  const [Messages, setMessages] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = userInfo;

  // test if logged in
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  // if user press enter key then send message
  useEffect(() => {
    document.getElementById("inputChat").addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        sendMessage();
        // console.log(e.key);
      }
    });
    init();
  }, []);

  // socket io events for recieving messages from other users
  useEffect(() => {
    socket.on("recieveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
      updateNotification(
        "success",
        "New Message Recieved from " + data.username.username
      );
    });

    socket.on("typingUser", (data) => {
      setTyping(data.username);
    });
  }, [socket]);

  // get all messages from database
  const init = async () => {
    let a = await getMessages(localStorage.getItem("auth-token"));
    if (a.error) return updateNotification("error", a.error);
    setMessages(a.data);
  };
  // send message to database and emit message to other users and add message to messages array
  const sendMessage = async () => {
    // if input is empty then return
    if (InputValue == "") return;

    // send message to database with header token to verify user is logged in

    const { error } = await addChatMessage(
      localStorage.getItem("auth-token"),
      InputValue
    );

    if (error) return updateNotification("error", error);
    setInputValue("");

    // emit message to other users
    socket.emit("sendMessage", {
      user: {
        username: userInfo.username,
        image: userInfo.image,
      },
      message: InputValue,
    });

    // add message to messages array to show in chat box
    let userData = {
      username: {
        username: userInfo.username,
        image: userInfo.image,
      },
      message: InputValue,
    };
    setMessages((prev) => [...prev, userData]);
    // return updateNotification("success", data.response);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value !== "") socket.emit("typing", userInfo.username);
  };

  return (
    <div className="homeContainer">
      <div className="main">
        <h1 className="main__heading">Welcome to Live Chat</h1>
        <div className="chat__container">
          {Messages &&
            Messages.map((message, index) => {
              return (
                <ChatBox
                  key={index}
                  imagePath={backendServer + message.username.image}
                  username={message.username.username}
                  message={message.message}
                />
              );
            })}
        </div>

        {typing && <div className="typing">{typing} is typing...</div>}
        <div className="formChat">
          <input
            type="text"
            placeholder="Type a message"
            className="inputChat"
            value={InputValue}
            id="inputChat"
            onChange={handleChange}
          />
          <svg
            viewBox="0 0 30 30"
            className="btnchat pointer"
            onClick={sendMessage}
          >
            <g>
              <path d={sendSvg}></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="right">
        <div className="right__username">
          {"UserName : " + userInfo.username}
        </div>
        <img
          src={backendServer + userInfo.image}
          alt=""
          className="right__img"
        />

        <div className="right__password">
          {"Password is :" + userInfo.password}
        </div>
      </div>
    </div>
  );
}
