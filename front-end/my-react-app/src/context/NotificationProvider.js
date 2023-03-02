import React, { createContext, useState } from "react";
import { dangerNot, succesNot, WarningNot } from "../ENV";

export const NotificationContext = createContext();
let timeoutid;
export default function NotificationProvider({ children }) {
  const [classe, setClasse] = useState();
  const [notification, setNotification] = useState("");

  const updateNotification = (type, value) => {
    if (timeoutid) clearTimeout(timeoutid);
    switch (type) {
      case "error":
        setClasse(dangerNot);
        break;
      case "success":
        setClasse(succesNot);
        break;
      case "warning":
        setClasse(WarningNot);
        break;
      default:
        break;
    }
    setNotification(value);

    timeoutid = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className=" fixed notification">
          <div
            className={
              classe + " gelatine smallPadding shadow-md dark:shadow-xl "
            }
          >
            <p className="text-white px-6 py-4 ">{notification}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
