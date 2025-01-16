import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const authInfo = {
    user,
    setUser,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
}
