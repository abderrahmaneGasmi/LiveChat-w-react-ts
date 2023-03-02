import React from "react";

export default function ChatBox({ imagePath, username, message }) {
  return (
    <div>
      <div className="chat__container__item">
        <img src={imagePath} alt="avatar" className="chat__container__image" />
        <div className="chat__container__info">
          <h1 className="chat__container__username"> {username} </h1>
          <p className="chat__container__message">{message}</p>
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
}
