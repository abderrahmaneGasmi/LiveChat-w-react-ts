import React, { createContext, useState } from "react";

export const GlobalVariableContext = createContext();
let timeoutid;
export default function GlobalVariablerovider({ children }) {
  const [messageNumber, setMessageNumber] = useState(0);

  return (
    <GlobalVariableContext.Provider value={{ messageNumber, setMessageNumber }}>
      {children}
    </GlobalVariableContext.Provider>
  );
}
