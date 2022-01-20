import React from "react";
import { useSelector } from "react-redux";
const AuthContext = React.createContext();

function Auth({ children }) {
  const { user, auth, isLoggedIn } = useSelector((state) => ({
    user: state.auth?.user,
    auth: state.auth,
    isLoggedIn: state.auth?.isLoggedIn,
  }));
  const value = { user, auth, isLoggedIn };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function Data({ children }) {
  return (
    <AuthContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("Data  must be used within a AuthContext");
        }
        return children(context);
      }}
    </AuthContext.Consumer>
  );
}
export { Auth, Data };
