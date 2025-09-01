import React, { createContext, useContext, useState, useEffect } from 'react';

export const Authcontext = createContext();

export default function Authprovidor({ children }) {
  const [authUser, setAuthUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Load user safely from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setAuthUser(JSON.parse(storedUser));
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      console.error("Invalid user data in localStorage. Clearing it.", error);
      localStorage.removeItem("user");
      setAuthUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Authcontext.Provider value={[authUser, setAuthUser, isLoading]}>
      {children}
    </Authcontext.Provider>
  );
}

export const useAuth = () => useContext(Authcontext);
