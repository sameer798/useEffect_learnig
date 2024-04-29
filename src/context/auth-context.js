import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
});

export const AuthContextProvider = (props) => {
    useEffect(() => {
        const userLoggedInInfo = localStorage.getItem("loggedIn");
        if (userLoggedInInfo === "1") {
          setIsLoggedIn(true);
        }
      }, []);
    
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const logoutHandler = () => {
        setIsLoggedIn(false);
      };
      const loginHandler = () => {
        setIsLoggedIn(true);
      };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
